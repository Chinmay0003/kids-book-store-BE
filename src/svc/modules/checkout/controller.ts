import { NextFunction, Response } from "express";
import { AuthRequest } from "~src/svc/modules/auth/middleware";
import { DeleteAddressSchema, PostAdddAddressToDbSchema } from "~src/svc/modules/checkout/schemas";
import { DeleteAddressRequest, PostAdddAddressToDbRequest } from "~src/svc/modules/checkout/types";
import {
  addAddRessToDb,
  assignAddressToCart,
  deleteAddressForId,
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
  await addAddRessToDb(parseInt(userId), data);
  const response = await fetchAllAddressesForUser(parseInt(userId));
  res.status(200).json(response);
};

export const deleteAddress = async (
  req: AuthRequest,
  res: Response,
  _next: NextFunction,
) => {
  let data: DeleteAddressRequest;
  try {
    data = DeleteAddressSchema.parse(req.query);
  } catch (e: unknown) {
    res.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    return;
  };
  const {addressId} = data;
  const userId = req.user?.id ?? "-1";
  await deleteAddressForId(addressId);
  const response = await fetchAllAddressesForUser(parseInt(userId));
  res.status(200).json(response);
};
