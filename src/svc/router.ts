import express from "express";
import { healthRouter } from "~src/svc/modules/health";

export const router = express.Router();

router.use("/health", healthRouter);
