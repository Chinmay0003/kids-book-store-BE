import { z } from "zod";

export const PostAdddAddressToDbSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  country: z.string(),
  streetAddress: z.string(),
  city: z.string(),
  state: z.string(),
  pincode: z.number(),
  phoneNumber: z.string(),
});

export const DeleteAddressSchema = z.object({
  addressId: z.number(),
});