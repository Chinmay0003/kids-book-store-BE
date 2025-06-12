import { z } from "zod";

export const PostAddBookToDbSchema = z.object({
  bookId: z.number(),
  cartType: z.string().optional(),
});

export const PutBooksToCartSchema = z.object({
  bookIds: z.array(z.number()),
  cartType: z.string().optional(),
});
