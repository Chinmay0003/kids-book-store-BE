import { NextFunction, Request, Response } from "express";
import {
  GetBusinessDataRequest,
  PostNewBusinessRequest,
  UpdateBusinessRequest,
  DeleteBusinessRequest,
} from "~src/svc/modules/business/schemas";
import {
  PostNewBusinessSchema,
  UpdateBusinessSchema,
  DeleteBusinessSchema,
  GetBusinessDataSchema,
} from "~src/svc/modules/business/types";
import {
  fetchAllBusinessFromDb,
  postNewBusinessToDB,
  updateBusinessToDB,
  deleteBusinessFromDB,
} from "~src/svc/modules/business/utils/db";

export const getAllBusiness = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let data: GetBusinessDataRequest;
  try {
    data = GetBusinessDataSchema.parse(req.query);
  } catch (e: unknown) {
    res.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    return;
  }
  const { businessId } = data;
  const businessData = await fetchAllBusinessFromDb(businessId);
  res.status(200).json({
    data: businessData,
  });
};

export const postNewBusiness = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let data: PostNewBusinessRequest;
  try {
    data = PostNewBusinessSchema.parse(req.body);
  } catch (e: unknown) {
    res.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    return;
  }
  const { name, address, phone, type, defaultCut } = data;
  await postNewBusinessToDB(name, address, phone, type, defaultCut);
  const businessData = await fetchAllBusinessFromDb();
  res.status(200).json({
    status: "OK",
    data: businessData,
  });
};

export const updateBusiness = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let data: UpdateBusinessRequest;
  try {
    data = UpdateBusinessSchema.parse(req.body);
  } catch (e: unknown) {
    res.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    return;
  }
  const { businessId, name, address, phone, type, defaultCut } = data;
  await updateBusinessToDB(businessId, name, address, phone, type, defaultCut);
  const businessData = await fetchAllBusinessFromDb();
  res.status(200).json({
    status: "OK",
    data: businessData,
  });
};

export const deleteBusiness = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let data: DeleteBusinessRequest;
  try {
    data = DeleteBusinessSchema.parse(req.body);
  } catch (e: unknown) {
    res.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    return;
  }
  const { businessId } = data;
  await deleteBusinessFromDB(businessId);
  const businessData = await fetchAllBusinessFromDb();
  res.status(200).json({
    status: "OK",
    data: businessData,
  });
};
