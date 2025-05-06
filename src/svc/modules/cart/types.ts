import { z } from "zod";
import {
  PostAddBookToDbSchema,
  PutBooksToCartSchema,
} from "~src/svc/modules/cart/schemas";

export type PostAddBookToDbRequest = z.infer<typeof PostAddBookToDbSchema>;

export type PutBooksToCartRequest = z.infer<typeof PutBooksToCartSchema>;
