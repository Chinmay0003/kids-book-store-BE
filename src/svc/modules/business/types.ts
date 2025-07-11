import { z } from "zod";

export const GetBusinessDataSchema = z.object({
  businessId: z.number().optional(),
});

export const PostNewBusinessSchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  type: z.string(),
  defaultCut: z.number(),
});

export const UpdateBusinessSchema = z.object({
  businessId: z.number(),
  name: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  type: z.string().optional(),
  defaultCut: z.number().optional(),
});

export const DeleteBusinessSchema = z.object({
  businessId: z.number(),
});
