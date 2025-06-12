import { NextFunction, Response } from "express";
import { AuthRequest } from "~src/svc/modules/auth/middleware";
import { ICartStatusEnum } from "~src/svc/modules/cart/enums";
import {
  PostAddBookToDbSchema,
  PutBooksToCartSchema,
} from "~src/svc/modules/cart/schemas";
import {
  PostAddBookToDbRequest,
  PutBooksToCartRequest,
} from "~src/svc/modules/cart/types";
import {
  addBookToCartForUser,
  getCurrentActiveCartForUser,
  updateCartWithBooksInDb,
} from "~src/svc/modules/cart/utils/utils";

export const getActiveCart = async (
  req: AuthRequest,
  res: Response,
  _next: NextFunction,
) => {
  const userId = req.user?.id ?? "-1";
  const response = await getCurrentActiveCartForUser(parseInt(userId));
  res.status(200).json(response);
};

export const addBookToCart = async (
  req: AuthRequest,
  res: Response,
  _next: NextFunction,
) => {
  let data: PostAddBookToDbRequest;
  try {
    data = PostAddBookToDbSchema.parse(req.body);
  } catch (e: unknown) {
    res.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    return;
  }
  const userId = req.user?.id ?? "-1";
  const { bookId, cartType } = data;
  await addBookToCartForUser(parseInt(userId), bookId, cartType as ICartStatusEnum);
  const response = await getCurrentActiveCartForUser(parseInt(userId));
  res.status(200).json(response);
};

export const updateCartWithBooks = async (
  req: AuthRequest,
  res: Response,
  _next: NextFunction,
) => {
  let data: PutBooksToCartRequest;
  try {
    data = PutBooksToCartSchema.parse(req.body);
  } catch (e: unknown) {
    res.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    return;
  }
  const userId = req.user?.id ?? "-1";
  const { bookIds, cartType } = data;
  await updateCartWithBooksInDb(parseInt(userId), bookIds, cartType as ICartStatusEnum);
  const response = await getCurrentActiveCartForUser(parseInt(userId));
  res.status(200).json(response);
};
