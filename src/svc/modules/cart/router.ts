import express, { RequestHandler } from "express";
import { authenticateJWT } from "~src/svc/modules/auth/middleware";
import {
  addBookToCart,
  getActiveCart,
  updateCartWithBooks,
} from "~src/svc/modules/cart/controller";

export const cartRouter = express.Router();

cartRouter.use(authenticateJWT as RequestHandler);
cartRouter.get("/", getActiveCart as RequestHandler);
cartRouter.post("/", addBookToCart as RequestHandler);
cartRouter.put("/", updateCartWithBooks as RequestHandler);
