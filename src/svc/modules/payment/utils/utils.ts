import { RazorpayClient } from "~src/clients/razorpay";
import { conf } from "~src/config/settings";
import { Book } from "~src/svc/modules/book/entities";
import { In, Not } from "typeorm";
import { Cart, CartBookTopology } from "~src/svc/modules/cart/entities";
import {
  fetchCartPriceData,
  fetchCouponForName,
} from "~src/svc/modules/checkout/utils/utils";
import { ICartStatusEnum } from "~src/svc/modules/cart/enums";

export const processPaymentInitialisationForBook = async (options: {
  cartId: number;
  addressId?: number;
  coupon?: string;
  isInitialBlock?: boolean;
  isBlockComplete?: boolean;
}) => {
  const cartRepository = conf.DEFAULT_DATA_SOURCE.getRepository(Cart);
  const requiredCart = await cartRepository.findOne({
    where: {
      id: options.cartId,
    },
    relations: {
      cartBookTopology: {
        book: true,
      },
    },
  });
  if (requiredCart === null || requiredCart.cartBookTopology.length === 0) {
    return;
  }

  const priceDetails = await fetchCartPriceData({
    cartId: options.cartId,
    coupon: options.coupon,
    isInitialBlock: options.isInitialBlock,
    isBlockComplete: options.isBlockComplete,
  });

  const razorpayClient = new RazorpayClient();
  const currentOrder = await razorpayClient.createOrder(priceDetails.finalPrice);

  return {
    ...currentOrder,
    shippingAddress: options.addressId,
    razorpayKeyId: conf.RAZORPAY_KEY_ID,
    items: requiredCart.cartBookTopology.map((cbt) => ({
      id: cbt.book.id,
      price: cbt.book.price,
      isSold: true,
    })),
    ...(options.isInitialBlock && {
      blockingPayment: true,
    }),
    ...(options.isBlockComplete && {
      shippingPaymentForBlockedCart: true,
    }),
  };
};

export const processPaymentSuccessful = async (
  cartId: number,
  addressId: number,
  coupon?: string,
) => {
  const cartRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Cart);
  const bookRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Book);
  const currCart = await cartRepo.findOne({
    where: {
      id: cartId,
      cartBookTopology: {
        book: {
          isSold: false,
        },
      },
    },
    relations: {
      cartBookTopology: {
        book: true,
      },
    },
  });
  if (currCart) {
    const currCoupon = await fetchCouponForName(coupon ?? "");
    await cartRepo.save({
      ...currCart,
      address: {
        id: addressId,
      },
      status: ICartStatusEnum.BOUGHT,
      ...(currCoupon !== null && {
        coupon: {
          id: currCoupon.id,
        },
      }),
    });
    const allBooks = currCart.cartBookTopology.map((e) => e.book);
    await bookRepo.save(
      allBooks.map((e) => ({
        ...e,
        isSold: true,
      })),
    );
  }
};

export const markCartAsBlocked = async (cartId: number) => {
  const cartRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Cart);
  const cartBookTopologyRepo = conf.DEFAULT_DATA_SOURCE.getRepository(CartBookTopology);

  const currCart = await cartRepo.findOne({
    where: { id: cartId },
    relations: { appUser: true, cartBookTopology: { book: true } },
  });
  if (!currCart) return;

  const otherPaidBlockCart = await cartRepo.findOne({
    where: {
      appUser: { id: currCart.appUser.id },
      status: ICartStatusEnum.PAID_BLOCK,
      id: Not(cartId),
    },
    relations: { cartBookTopology: { book: true } },
  });

  if (otherPaidBlockCart) {
    const currBookIds = new Set(currCart.cartBookTopology.map((e) => e.book.id));
    const toMove = otherPaidBlockCart.cartBookTopology.filter(
      (e) => !currBookIds.has(e.book.id),
    );

    await cartBookTopologyRepo.save(
      toMove.map((entry) => ({
        ...entry,
        cart: { id: currCart.id },
      })),
    );
    await cartRepo.delete(otherPaidBlockCart.id);
  }
  await cartRepo.update(cartId, { status: ICartStatusEnum.PAID_BLOCK });
};

export const processPaymentSuccessfulForBlockedCart = async (
  cartId: number,
  addressId: number,
) => {
  const cartRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Cart);
  const currCart = await cartRepo.findOne({
    where: {
      id: cartId,
    },
    relations: {
      cartBookTopology: {
        book: true,
      },
    },
  });
  if (currCart) {
    await cartRepo.save({
      ...currCart,
      status: ICartStatusEnum.BOUGHT,
      address: {
        id: addressId,
      },
    });
  }
};
