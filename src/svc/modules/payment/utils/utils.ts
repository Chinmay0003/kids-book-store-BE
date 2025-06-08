import { RazorpayClient } from "~src/clients/razorpay";
import { conf } from "~src/config/settings";
import { Book } from "~src/svc/modules/book/entities";
import { In } from "typeorm";
import { Cart } from "~src/svc/modules/cart/entities";
import { fetchCartPriceData } from "~src/svc/modules/checkout/utils/utils";

export const processPaymentInitialisationForBook = async (
  cartId: number,
  address: number,
  coupon?: string,
) => {
  const cartRepository = conf.DEFAULT_DATA_SOURCE.getRepository(Cart);

  const requiredCart = await cartRepository.findOne({
    where: {
      id: cartId,
    },
    relations: {
      cartBookTopology: {
        book: true,
      },
    },
  });
  if (!requiredCart?.cartBookTopology.length) {
    return;
  }

  const priceDetails = await fetchCartPriceData({
    cartId,
    coupon,
  });

  const razorpayClient = new RazorpayClient();
  const currentOrder = await razorpayClient.createOrder(priceDetails.finalPrice);

  return {
    ...currentOrder,
    shippingAddress: address,
    razorpayKeyId: conf.RAZORPAY_KEY_ID,
    items: requiredCart.cartBookTopology.map((cbt) => ({
      id: cbt.book.id,
      price: cbt.book.price,
      isSold: true,
    })),
  };
};

export const markBookAsSold = async (bookId: number) => {
  const bookRepository = conf.DEFAULT_DATA_SOURCE.getRepository(Book);
  const requiredBook = await bookRepository.findOne({
    where: {
      id: bookId,
    },
  });
  if (requiredBook === null) {
    return;
  }
  await bookRepository.update(requiredBook.id, {
    isSold: true,
  });
};
