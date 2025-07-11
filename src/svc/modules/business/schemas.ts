import { z } from "zod";
import {
  GetBusinessDataSchema,
  PostNewBusinessSchema,
  UpdateBusinessSchema,
  DeleteBusinessSchema,
} from "~src/svc/modules/business/types";

export type GetBusinessDataRequest = z.infer<typeof GetBusinessDataSchema>;

export type PostNewBusinessRequest = z.infer<typeof PostNewBusinessSchema>;

export type UpdateBusinessRequest = z.infer<typeof UpdateBusinessSchema>;

export type DeleteBusinessRequest = z.infer<typeof DeleteBusinessSchema>;
