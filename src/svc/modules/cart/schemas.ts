import { z } from "zod";

export const PostAddBookToDbSchema = z.object({
  bookId: z.number(),
});

export const PutBooksToCartSchema = z.object({
  bookIds: z.array(z.number()),
});
