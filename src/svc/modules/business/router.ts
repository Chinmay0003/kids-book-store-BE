import express from "express";
import {
  getAllBusiness,
  postNewBusiness,
  updateBusiness,
  deleteBusiness,
  postBusinessTopology,
  getBusinessTopology,
} from "~src/svc/modules/business/controller";

export const businessRouter = express.Router();

businessRouter.get("/", getAllBusiness);
businessRouter.post("/", postNewBusiness);
businessRouter.put("/", updateBusiness);
businessRouter.delete("/", deleteBusiness);
businessRouter.get("/topology", getBusinessTopology);
businessRouter.post("/topology", postBusinessTopology);
