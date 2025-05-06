import { NextFunction, Response } from "express";
import { AuthRequest } from "~src/svc/modules/auth/middleware";
import { PostAdddAddressToDbSchema } from "~src/svc/modules/checkout/schemas";
import { PostAdddAddressToDbRequest } from "~src/svc/modules/checkout/types";
import {
  addAddRessToDb,
  assignAddressToCart,
  fetchAllAddressesForUser,
} from "~src/svc/modules/checkout/utils/utils";

export const getAllAddresses = async (
  req: AuthRequest,
  res: Response,
  _next: NextFunction,
) => {
  const userId = req.user?.id ?? "-1";
  const response = await fetchAllAddressesForUser(parseInt(userId));
  res.status(200).json(response);
};

export const addAddress = async (
  req: AuthRequest,
  res: Response,
  _next: NextFunction,
) => {
  let data: PostAdddAddressToDbRequest;
  try {
    data = PostAdddAddressToDbSchema.parse(req.body);
  } catch (e: unknown) {
    res.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    return;
  }
  const userId = req.user?.id ?? "-1";
  const { cartId } = data;
  const addressId = await addAddRessToDb(parseInt(userId), data);
  await assignAddressToCart(cartId, addressId);
  const response = await fetchAllAddressesForUser(parseInt(userId));
  res.status(200).json(response);
};
