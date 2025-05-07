import { z } from "zod";

export const PostPaymentInitialisationSchema = z.object({
  bookIds: z.array(z.number()),
  addressId: z.number(),
});

export const PostPaymentSuccessfulSchema = z.object({
  bookIds: z.array(z.number()),
});
