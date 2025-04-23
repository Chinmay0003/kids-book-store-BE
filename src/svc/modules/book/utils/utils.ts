import { NextFunction, Request, Response } from "express";
import { conf } from "~src/config/settings";
import { Book, BookMedia } from "~src/svc/modules/book/entities";
import { IBookEnum, MediaTypeEnum } from "~src/svc/modules/book/enum";
import { DeepPartial } from "typeorm";

export const postNewBookDataToDB = async (bookData: {
  name?: string;
  category?: string;
  price?: number;
}) => {
  const bookRepository = conf.DEFAULT_DATA_SOURCE.getRepository(Book);
  const savedBook = await bookRepository.save({
    name: bookData.name,
    category: bookData.category as IBookEnum,
    price: bookData.price,
  });
  return savedBook.id;
};

export const postNewBookMediaToS3 = async (
  req: Request,
  res: Response,
  _next: NextFunction,
  bookId: number,
) => {
  const bookMediaRepo = conf.DEFAULT_DATA_SOURCE.getRepository(BookMedia);
  const files = req.files as Express.MulterS3.File[];

  const bookMediaToSave = files
    .map((file) => {
      let mediaType: MediaTypeEnum;
      if (file.mimetype.startsWith("video/")) {
        mediaType = MediaTypeEnum.VIDEO;
      } else if (file.mimetype.startsWith("image/")) {
        mediaType = MediaTypeEnum.IMAGE;
      } else {
        return;
      }

      return {
        metadata: {
					s3_key: file.key,
          s3_url: file.location,
          mime_type: file.mimetype,
        },
        type: mediaType,
        book: { id: bookId },
      } as DeepPartial<BookMedia>;
    })
    .filter((ele) => ele !== undefined);

  await bookMediaRepo.save(bookMediaToSave);

  res.status(200).json({ status: "Media uploaded", files: bookMediaToSave });
};
