import { z } from "zod";

export const GetBookDataSchema = z.object({
  bookId: z.string().optional(),
});

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

export const UpdateBookDataSchema = z.object({
  bookId: z.number(),
  name: z.string().optional(),
  category: z.string().optional(),
  price: z.number().optional(),
  quality: z.string().optional(),
  bookType: z.string().optional(),
  mediaToDelete: z.array(z.number()).optional(),
  isSold: z.boolean().optional(),
});
