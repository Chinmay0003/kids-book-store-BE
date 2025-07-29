import { NextFunction, Request, Response } from "express";
import Razorpay from "razorpay";
import { assignAddressAndCouponToCart } from "~src/svc/modules/checkout/utils/utils";
import {
  CartBlockedPaymentSuccessSchema,
  PostPaymentInitialisationSchema,
  PostPaymentSuccessfulForBlockedCartSchema,
  PostPaymentSuccessfulSchema,
} from "~src/svc/modules/payment/schemas";
import {
  CartBlockedPaymentSuccessRequest,
  PostPaymentInitialisationRequest,
  PostPaymentSuccessfulForBlockedCartRequest,
  PostPaymentSuccessfulRequest,
} from "~src/svc/modules/payment/types";
import {
  markCartAsBlocked,
  processPaymentInitialisationForBook,
  processPaymentSuccessful,
  processPaymentSuccessfulForBlockedCart,
} from "~src/svc/modules/payment/utils/utils";

export const initiatePayment = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let data: PostPaymentInitialisationRequest;
  try {
    data = PostPaymentInitialisationSchema.parse(req.body);
  } catch (e: unknown) {
    res.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    return;
  }
  const response = await processPaymentInitialisationForBook(data);
  if (response === undefined) {
    res.status(400).json({
      message: "Book not found",
    });
  }
  res.status(200).json(response);
};

export const successfulPayment = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let data: PostPaymentSuccessfulRequest;
  try {
    data = PostPaymentSuccessfulSchema.parse(req.body);
  } catch (e: unknown) {
    res.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    return;
  }
  const { cartId, addressId, coupon } = data;
  await processPaymentSuccessful(cartId, addressId, coupon);
  res.status(200).json({ status: "OK" });
};

export const cartBlockedPaymentSuccess = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let data: CartBlockedPaymentSuccessRequest;
  try {
    data = CartBlockedPaymentSuccessSchema.parse(req.body);
  } catch (e: unknown) {
    res.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    return;
  }
  const { cartId } = data;
  await markCartAsBlocked(cartId);
  res.status(200).json({ status: "OK" });
};

export const successfulPaymentForBlockedCart = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let data: PostPaymentSuccessfulForBlockedCartRequest;
  try {
    data = PostPaymentSuccessfulForBlockedCartSchema.parse(req.body);
  } catch (e: unknown) {
    res.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    return;
  }
  const { cartId, addressId } = data;
  await processPaymentSuccessfulForBlockedCart(cartId, addressId);
  res.status(200).json({ status: "OK" });
};
