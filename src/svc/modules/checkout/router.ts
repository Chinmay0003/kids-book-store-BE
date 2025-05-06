import express, { RequestHandler } from "express";
import { authenticateJWT } from "~src/svc/modules/auth/middleware";
import { getActiveCart } from "~src/svc/modules/cart/controller";
import { addAddress, getAllAddresses } from "~src/svc/modules/checkout/controller";

export const checkoutRouter = express.Router();

checkoutRouter.use(authenticateJWT as RequestHandler);
checkoutRouter.get("/", getAllAddresses as RequestHandler);
checkoutRouter.post("/", addAddress as RequestHandler);
