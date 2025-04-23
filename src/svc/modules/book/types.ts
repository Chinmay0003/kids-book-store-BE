import { z } from "zod";
import { PostNewBookSchema } from "~src/svc/modules/book/schemas";

export type PostNewBookRequest = z.infer<typeof PostNewBookSchema>;

export interface IBookMetadata {
    bookCondition?: string;
};

export interface IBookMediaMetadata {
    s3_path: string;
    mime_type: string;
};
