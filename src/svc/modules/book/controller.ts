import { NextFunction, Request, Response } from "express";
import { uploadWithBookId } from "~src/svc/modules/book/muller";
import {
  GetBookDataSchema,
  PostNewBookMediaSchema,
  PostNewBookSchema,
  UpdateBookDataSchema,
} from "~src/svc/modules/book/schemas";
import {
  GetBookDataRequest,
  PostNewBookMediaRequest,
  PostNewBookRequest,
  UpdateBookDataRequest,
} from "~src/svc/modules/book/types";
import {
  fetchAllBooksFromDb,
  postNewBookDataToDB,
  postNewBookMediaToS3,
  updateBookDataInDb,
} from "~src/svc/modules/book/utils/utils";

export const getAllBooks = async (req: Request, res: Response, _next: NextFunction) => {
  let data: GetBookDataRequest;
  try {
    data = GetBookDataSchema.parse(req.query);
  } catch (e: unknown) {
    res.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    return;
  }
  const{bookId} = data;
  const bookData = await fetchAllBooksFromDb(bookId);
  res.status(200).json({
    bookData,
  });
};

export const postNewBookData = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let data: PostNewBookRequest;
  try {
    data = PostNewBookSchema.parse(req.body);
  } catch (e: unknown) {
    res.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    return;
  }
  const bookId = await postNewBookDataToDB(data);
  res.status(200).json({
    status: "OK",
    bookId,
  });
};

export const postNewBookMedia = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let data: PostNewBookMediaRequest;
  try {
    data = PostNewBookMediaSchema.parse(req.query);
  } catch (e: unknown) {
    res.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    return;
  }
  const { bookId } = data;
  (req as any).bookId = bookId;
  uploadWithBookId.array("media", 5)(req, res, async (err) => {
    if (err) return next(err);

    await postNewBookMediaToS3(req, res, next, parseInt(bookId));
  });
};

export const updateBookData = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let data: UpdateBookDataRequest;
  try {
    data = UpdateBookDataSchema.parse(req.body);
  } catch (e: unknown) {
    res.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    return;
  }
  await updateBookDataInDb(data);
  res.status(200).json({ status: "OK" });
};
