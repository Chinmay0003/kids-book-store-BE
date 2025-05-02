import express from "express";
import { healthRouter } from "~src/svc/modules/health";
import { bookRouter } from "~src/svc/modules/book";
import { paymentRouter } from "~src/svc/modules/payment";

export const router = express.Router();

router.use("/health", healthRouter);
router.use("/book", bookRouter);
router.use("/payment", paymentRouter);
