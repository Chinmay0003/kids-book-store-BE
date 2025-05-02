import { z } from "zod";
import { PostPaymentInitialisationSchema, PostPaymentSuccessfulSchema } from "~src/svc/modules/payment/schemas";

export type PostPaymentInitialisationRequest = z.infer<typeof PostPaymentInitialisationSchema>;

export type PostPaymentSuccessfulRequest = z.infer<typeof PostPaymentSuccessfulSchema>;
