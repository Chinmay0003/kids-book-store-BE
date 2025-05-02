import express from "express";
import { initiatePayment, successfulPayment } from "~src/svc/modules/payment/controller";

export const paymentRouter = express.Router();

paymentRouter.post("/initiate", initiatePayment);
paymentRouter.post("/successful", successfulPayment);
