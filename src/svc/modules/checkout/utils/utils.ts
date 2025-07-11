import { conf } from "~src/config/settings";
import { Cart } from "~src/svc/modules/cart/entities";
import {
  BLOCKING_PERCENTAGE,
  FREE_DELIVERY_PRICE_THRESHOLD,
} from "~src/svc/modules/checkout/constants";
import { Address } from "~src/svc/modules/checkout/entities";
import { Coupon } from "~src/svc/modules/checkout/entities/coupon";
import { IAddressCountryEnum } from "~src/svc/modules/checkout/enums";

export const fetchAllAddressesForUser = async (userId: number) => {
  const adressRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Address);
  return await adressRepo.find({
    where: {
      appUser: {
        id: userId,
      },
    },
  });
};

export const addAddRessToDb = async (
  userId: number,
  addressData: {
    firstName: string;
    lastName: string;
    country: string;
    streetAddress: string;
    city: string;
    state: string;
    pincode: number;
    phoneNumber: string;
  },
) => {
  const addressRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Address);
  const newAddress = await addressRepo.save({
    appUser: {
      id: userId,
    },
    firstName: addressData.firstName,
    lastName: addressData.lastName,
    country: addressData.country as IAddressCountryEnum,
    streetAddress: addressData.streetAddress,
    city: addressData.city,
    state: addressData.state,
    pincode: addressData.pincode,
    phoneNumber: addressData.phoneNumber,
  });
  return newAddress.id;
};

export const assignAddressAndCouponToCart = async (
  cartId: number,
  addressId: number,
  coupon?: string,
) => {
  const cartRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Cart);
  const couponRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Coupon);
  const currCoupon = coupon
    ? await couponRepo.findOne({
        where: {
          name: coupon,
        },
      })
    : null;
  await cartRepo.update(cartId, {
    address: {
      id: addressId,
    },
    ...(currCoupon !== null && {
      coupon: {
        id: currCoupon.id,
      },
    }),
  });
};

export const deleteAddressForId = async (addressId: number) => {
  const addressRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Address);
  await addressRepo.delete(addressId);
};

export const fetchCouponForName = async (couponName: string) => {
  const couponRepository = conf.DEFAULT_DATA_SOURCE.getRepository(Coupon);
  return await couponRepository.findOne({
    where: {
      name: couponName,
    },
  });
};

export const checkCouponValidity = (coupon: Coupon) => {
  if (!coupon.isActive) {
    return false;
  }
  const currDate = new Date();
  if (
    coupon.validityCriteria.days !== undefined &&
    !coupon.validityCriteria.days.includes(currDate.getDay())
  ) {
    return false;
  }
  if (
    coupon.validityCriteria.date !== undefined &&
    !coupon.validityCriteria.date.includes(currDate.toISOString().split("T")[0])
  ) {
    return false;
  }
  return true;
};

export const fetchCartPriceData = async (checkoutData: {
  cartId: number;
  coupon?: string;
  isInitialBlock?: boolean;
  isBlockComplete?: boolean;
}) => {
  const cartRepository = conf.DEFAULT_DATA_SOURCE.getRepository(Cart);
  const currCart = await cartRepository.findOne({
    where: {
      id: checkoutData.cartId,
    },
    relations: {
      cartBookTopology: {
        book: true,
      },
    },
  });
  if (currCart === null) {
    return {
      cartPrice: 0,
      discountAmount: 0,
      deliveryCharge: 0,
      finalPrice: 0,
    };
  }
  let cartPrice = 0;
  let discountAmount = 0;
  let deliveryCharge = 100;
  currCart.cartBookTopology.forEach((cbt) => (cartPrice += cbt.book.price));
  if (checkoutData.isInitialBlock ?? false) {
    return {
      cartPrice: cartPrice,
      blockingAmount: cartPrice * BLOCKING_PERCENTAGE,
      discountAmount: 0,
      deliveryCharge: 0,
      finalPrice: cartPrice * BLOCKING_PERCENTAGE,
    };
  }
  if (checkoutData.isBlockComplete ?? false) {
    if (cartPrice >= FREE_DELIVERY_PRICE_THRESHOLD) {
      deliveryCharge = 0;
    }
    return {
      cartPrice,
      discountAmount: 0,
      deliveryCharge,
      amountPaidWhileBlocking: cartPrice * BLOCKING_PERCENTAGE,
      finalPrice: cartPrice * (1 - BLOCKING_PERCENTAGE) + deliveryCharge,
    };
  }
  if (checkoutData.coupon !== undefined) {
    const currCoupon = await fetchCouponForName(checkoutData.coupon);
    if (currCoupon !== null && checkCouponValidity(currCoupon)) {
      if (currCoupon.discountAmount.flatAmount !== undefined) {
        discountAmount =
          cartPrice > currCoupon.discountAmount.flatAmount
            ? currCoupon.discountAmount.flatAmount
            : cartPrice;
      } else if (currCoupon.discountAmount.percentage !== undefined) {
        discountAmount = (cartPrice * currCoupon.discountAmount.percentage) / 100;
      }
    }
  }
  let finalPrice = cartPrice > discountAmount ? cartPrice - discountAmount : 0;
  if (finalPrice >= FREE_DELIVERY_PRICE_THRESHOLD) {
    deliveryCharge = 0;
  }
  finalPrice += deliveryCharge;
  return {
    cartPrice,
    discountAmount,
    deliveryCharge,
    finalPrice,
  };
};
