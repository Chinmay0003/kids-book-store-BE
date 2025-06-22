import { z } from "zod";
import {
  GetBookDataSchema,
  PostNewBookMediaSchema,
  PostNewBookSchema,
  SendBookToWhatsappSchema,
  UpdateBookDataSchema,
} from "~src/svc/modules/book/schemas";

export type GetBookDataRequest = z.infer<typeof GetBookDataSchema>;

export type PostNewBookRequest = z.infer<typeof PostNewBookSchema>;

export type PostNewBookMediaRequest = z.infer<typeof PostNewBookMediaSchema>;

export type UpdateBookDataRequest = z.infer<typeof UpdateBookDataSchema>;

export type SendBookToWhatsappRequest = z.infer<typeof SendBookToWhatsappSchema>;

export interface IBookMetadata {
  bookCondition?: string;
}

export interface IBookMediaMetadata {
  s3_key: string;
  s3_path: string;
  mime_type: string;
}
