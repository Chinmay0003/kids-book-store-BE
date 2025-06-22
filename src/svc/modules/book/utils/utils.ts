import { NextFunction, Request, Response } from "express";
import { conf } from "~src/config/settings";
import { Book, BookMedia } from "~src/svc/modules/book/entities";
import {
  IBookContentCategoryEnum,
  IBookEnum,
  IBookQualityEnum,
  IBookTypeEnum,
  MediaTypeEnum,
} from "~src/svc/modules/book/enum";
import { DeepPartial } from "typeorm";

export const fetchAllBooksFromDb = async (bookId: string | undefined) => {
  const bookRepository = conf.DEFAULT_DATA_SOURCE.getRepository(Book);
  const books = await bookRepository.find({
    ...(bookId && {
      where: {
        id: parseInt(bookId),
      },
    }),
    relations: {
      bookMedia: true,
    },
    order: {
      createdAt: "DESC",
    },
  });
  return books;
};

export const postNewBookDataToDB = async (bookData: {
  name?: string;
  category?: string;
  price?: number;
  quality?: string;
  bookType?: string;
  contentCategory?: string;
  sendWhatsappMsg?: boolean;
}) => {
  const bookRepository = conf.DEFAULT_DATA_SOURCE.getRepository(Book);
  const savedBook = await bookRepository.save({
    name: bookData.name,
    category: bookData.category as IBookEnum,
    price: bookData.price,
    quality: bookData.quality as IBookQualityEnum,
    type: bookData.bookType as IBookTypeEnum,
    contentCategory: bookData.contentCategory as IBookContentCategoryEnum,
    sendWhatsappMsg: bookData.sendWhatsappMsg,
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
  console.log("Files received:", files);
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

export const updateBookDataInDb = async (bookData: {
  bookId: number;
  name?: string;
  category?: string;
  price?: number;
  quality?: string;
  bookType?: string;
  contentCategory?: string;
  mediaToDelete?: number[];
  isSold?: boolean;
  sendWhatsappMsg?: boolean;
}) => {
  const bookRepository = conf.DEFAULT_DATA_SOURCE.getRepository(Book);
  const bookMediaRepository = conf.DEFAULT_DATA_SOURCE.getRepository(BookMedia);
  const existingBook = await bookRepository.findOne({
    where: {
      id: bookData.bookId,
    },
  });
  if (existingBook === null) {
    return;
  }
  await bookRepository.save({
    ...existingBook,
    ...(bookData.name !== undefined && { name: bookData.name }),
    ...(bookData.category !== undefined && {
      category: bookData.category as IBookEnum,
    }),
    ...(bookData.price !== undefined && { price: bookData.price }),
    ...(bookData.quality !== undefined && {
      quality: bookData.quality as IBookQualityEnum,
    }),
    ...(bookData.bookType !== undefined && {
      type: bookData.bookType as IBookTypeEnum,
    }),
    ...(bookData.contentCategory !== undefined && {
      contentCategory: bookData.contentCategory as IBookContentCategoryEnum,
    }),
    ...(bookData.isSold !== undefined && {
      isSold: bookData.isSold,
    }),
  });
  if (bookData.mediaToDelete !== undefined && bookData.mediaToDelete.length > 0) {
    await bookMediaRepository.delete(bookData.mediaToDelete);
  }
};

export const sendBookToWhatsappUtil = async (bookId: number) => {
  const bookRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Book);
  await bookRepo.update(bookId, { sendWhatsappMsg: true });
};
