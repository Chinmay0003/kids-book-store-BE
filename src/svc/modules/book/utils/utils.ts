import multer from "multer";
import { NextFunction, Request, Response } from "express";
import { conf } from "~src/config/settings";
import { Book, BookMedia } from "~src/svc/modules/book/entities";
import { IBookEnum, MediaTypeEnum } from "~src/svc/modules/book/enum";
import { uploadWithDynamicPath } from "~src/svc/modules/common/middlewares/muller-s3";
import { DeepPartial } from "typeorm";

export const postNewBookDataToDB = async (
    bookData: {
        name?: string;
        category?: string;
        price?: number;
    },
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const parseFormFields = multer().none();
    parseFormFields(req, res, async (err) => {
        if (err) return next(err);
    
        try {
          const bookRepository = conf.DEFAULT_DATA_SOURCE.getRepository(Book);
    
          const savedBook = await bookRepository.save({
            name: bookData.name,
            category: bookData.category as IBookEnum,
            price: bookData.price,
          });
    
          (req as any).bookId = savedBook.id;
    
          uploadWithDynamicPath.array("media", 5)(req, res, async (err) => {
            if (err) return next(err);
    
            const files = req.files as Express.MulterS3.File[];
            const bookMediaToSave = files.map((file) => {
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
                        s3_url: file.location,
                        mime_type: file.mimetype,
                    },
                    type: mediaType,
                    book: {
                        id: savedBook.id,
                    }
                } as DeepPartial<BookMedia>;
            }).filter(ele => ele !== undefined);
            const bookMediaRepository = conf.DEFAULT_DATA_SOURCE.getRepository(BookMedia);
            await bookMediaRepository.save(bookMediaToSave);
            res.status(201).json({
              message: "OK",
            });
          });
        } catch (error) {
          next(error);
        }
    });
};
