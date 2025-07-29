import { z } from "zod";
import {
  GetBusinessDataSchema,
  PostNewBusinessSchema,
  UpdateBusinessSchema,
  DeleteBusinessSchema,
  PostBusinessTopologySchema,
  GetBusinessTopologySchema,
} from "~src/svc/modules/business/types";

export type GetBusinessDataRequest = z.infer<typeof GetBusinessDataSchema>;

export type PostNewBusinessRequest = z.infer<typeof PostNewBusinessSchema>;

export type UpdateBusinessRequest = z.infer<typeof UpdateBusinessSchema>;

export type DeleteBusinessRequest = z.infer<typeof DeleteBusinessSchema>;

export type PostBusinessTopologyRequest = z.infer<typeof PostBusinessTopologySchema>;

export type GetBusinessTopologyRequest = z.infer<typeof GetBusinessTopologySchema>;
