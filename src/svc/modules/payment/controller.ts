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
    data = PostPaymentInitialisationSchema.parse(req.query);
  } catch (e: unknown) {
    res.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    return;
  }
  const { bookId } = data;
  const response = await processPaymentInitialisationForBook(parseInt(bookId));
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
    data = PostPaymentSuccessfulSchema.parse(req.query);
  } catch (e: unknown) {
    res.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    return;
  }
  const { bookId } = data;
  await markBookAsSold(parseInt(bookId));
  res.status(200).json({ status: "OK" });
};
