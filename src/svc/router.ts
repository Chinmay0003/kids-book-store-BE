import express from "express";
import { healthRouter } from "~src/svc/modules/health";
import { bookRouter } from "~src/svc/modules/book";

export const router = express.Router();

router.use("/health", healthRouter);
router.use("/book", bookRouter);
