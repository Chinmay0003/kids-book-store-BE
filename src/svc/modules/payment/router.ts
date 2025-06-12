import express from "express";
import {
  cartBlockedPaymentSuccess,
  initiatePayment,
  successfulPayment,
  successfulPaymentForBlockedCart,
} from "~src/svc/modules/payment/controller";

export const paymentRouter = express.Router();

paymentRouter.post("/initiate", initiatePayment);
paymentRouter.post("/successful", successfulPayment);
paymentRouter.post("/blocked", cartBlockedPaymentSuccess);
paymentRouter.post("/block-cart-bought", successfulPaymentForBlockedCart);
