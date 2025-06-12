import { z } from "zod";
import {
  CartBlockedPaymentSuccessSchema,
  PostPaymentInitialisationSchema,
  PostPaymentSuccessfulForBlockedCartSchema,
  PostPaymentSuccessfulSchema,
} from "~src/svc/modules/payment/schemas";

export type PostPaymentInitialisationRequest = z.infer<
  typeof PostPaymentInitialisationSchema
>;

export type PostPaymentSuccessfulRequest = z.infer<typeof PostPaymentSuccessfulSchema>;

export type PostPaymentSuccessfulForBlockedCartRequest = z.infer<typeof PostPaymentSuccessfulForBlockedCartSchema>;

export type CartBlockedPaymentSuccessRequest = z.infer<typeof CartBlockedPaymentSuccessSchema>;