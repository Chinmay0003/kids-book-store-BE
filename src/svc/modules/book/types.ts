import { z } from "zod";
import {
  PostNewBookMediaSchema,
  PostNewBookSchema,
  UpdateBookDataSchema,
} from "~src/svc/modules/book/schemas";

export type PostNewBookRequest = z.infer<typeof PostNewBookSchema>;

export type PostNewBookMediaRequest = z.infer<typeof PostNewBookMediaSchema>;

export type UpdateBookDataRequest = z.infer<typeof UpdateBookDataSchema>;

export interface IBookMetadata {
  bookCondition?: string;
}

export interface IBookMediaMetadata {
  s3_key: string;
  s3_path: string;
  mime_type: string;
}
