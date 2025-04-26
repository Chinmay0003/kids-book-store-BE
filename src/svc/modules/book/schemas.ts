import { z } from "zod";

export const PostNewBookSchema = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
  price: z.number().optional(),
  quality: z.string().optional(),
  bookType: z.string().optional(),
});

export const PostNewBookMediaSchema = z.object({
  bookId: z.string(),
});
