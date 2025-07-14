import { NextFunction, Request, Response } from "express";
import {
  GetBusinessDataRequest,
  PostNewBusinessRequest,
  UpdateBusinessRequest,
  DeleteBusinessRequest,
  PostBusinessTopologyRequest,
  GetBusinessTopologyRequest,
} from "~src/svc/modules/business/schemas";
import {
  PostNewBusinessSchema,
  UpdateBusinessSchema,
  DeleteBusinessSchema,
  GetBusinessDataSchema,
  PostBusinessTopologySchema,
  GetBusinessTopologySchema,
} from "~src/svc/modules/business/types";
import {
  fetchAllBusinessFromDb,
  postNewBusinessToDB,
  updateBusinessToDB,
  deleteBusinessFromDB,
  postBusinessTopologyToDB,
  fetchAllBusinessTopologyFromDb,
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
  console.log(businessData);
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

export const getBusinessTopology = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let data: GetBusinessTopologyRequest;
  try {
    data = GetBusinessTopologySchema.parse(req.query);
  } catch (e: unknown) {
    res.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    return;
  }
  const { businessId } = data;
  const businessData = await fetchAllBusinessTopologyFromDb(businessId);
  res.status(200).json({
    data: businessData,
  });
};

export const postBusinessTopology = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let data: PostBusinessTopologyRequest;
  try {
    data = PostBusinessTopologySchema.parse(req.body);
  } catch (e: unknown) {
    res.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    return;
  }
  const { businessId, bookId, cut } = data;
  await postBusinessTopologyToDB(businessId, bookId, cut);
  const businessData = await fetchAllBusinessTopologyFromDb(businessId);
  res.status(200).json({
    status: "OK",
    data: businessData,
  });
};
