import { z } from "zod";

export const PostPaymentInitialisationSchema = z.object({
  cartId: z.number(),
  addressId: z.number(),
  coupon: z.string().optional(),
});

export const PostPaymentSuccessfulSchema = z.object({
  bookIds: z.array(z.number()),
});
