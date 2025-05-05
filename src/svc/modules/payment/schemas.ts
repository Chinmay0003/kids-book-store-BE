import { z } from "zod";

export const PostPaymentInitialisationSchema = z.object({
    bookId: z.string(),
});

export const PostPaymentSuccessfulSchema = z.object({
    bookId: z.string(),
});
