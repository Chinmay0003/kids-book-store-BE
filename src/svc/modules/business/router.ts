import express from "express";
import {
  getAllBusiness,
  postNewBusiness,
  updateBusiness,
  deleteBusiness,
} from "~src/svc/modules/business/controller";

export const businessRouter = express.Router();

businessRouter.get("/", getAllBusiness);
businessRouter.post("/", postNewBusiness);
businessRouter.put("/", updateBusiness);
businessRouter.delete("/", deleteBusiness);
