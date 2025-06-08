import { NextFunction, Request, Response } from "express";
import Razorpay from "razorpay";
import {
  PostPaymentInitialisationSchema,
  PostPaymentSuccessfulSchema,
} from "~src/svc/modules/payment/schemas";
import {
  PostPaymentInitialisationRequest,
  PostPaymentSuccessfulRequest,
} from "~src/svc/modules/payment/types";
import {
  markBookAsSold,
  processPaymentInitialisationForBook,
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
  const { cartId, addressId, coupon } = data;
  const response = await processPaymentInitialisationForBook(cartId, addressId, coupon);
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
  const { bookIds } = data;
  await Promise.all(bookIds.map(markBookAsSold));
  res.status(200).json({ status: "OK" });
};
