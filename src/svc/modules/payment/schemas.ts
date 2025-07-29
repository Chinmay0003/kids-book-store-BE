import { z } from "zod";

export const PostPaymentInitialisationSchema = z.object({
  cartId: z.number(),
  addressId: z.number().optional(),
  coupon: z.string().optional(),
  isInitialBlock: z.boolean().optional(),
  isBlockComplete: z.boolean().optional(),
});

export const PostPaymentSuccessfulSchema = z.object({
  cartId: z.number(),
  addressId: z.number(),
  coupon: z.string().optional(),
});

export const PostPaymentSuccessfulForBlockedCartSchema = z.object({
  cartId: z.number(),
  addressId: z.number(),
});

export const CartBlockedPaymentSuccessSchema = z.object({
  cartId: z.number(),
});
