import multer from "multer";
import multerS3 from "multer-s3";
import { v4 as uuid } from "uuid";
import { S3Client } from "@aws-sdk/client-s3";
import { conf } from "~src/config/settings";
import { MediaTypeEnum } from "~src/svc/modules/book/enum";

const s3Client = new S3Client({
  region: conf.REGION,
  credentials: {
    accessKeyId: conf.ACCESS_KEY_ID,
    secretAccessKey: conf.SECRET_ACCESS_KEY,
  },
});

export const uploadWithBookId = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "best-kid-book-media",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const bookId = (req as any).query.bookId;
      const randomUuid = uuid();
      const extension = file.mimetype.startsWith("image/") ? ".jpg" : ".mp4";
      const path = `${bookId}/${randomUuid}${extension}`;
      cb(null, path);
    },
  }),
});
