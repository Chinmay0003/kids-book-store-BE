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

export const uploadWithDynamicPath = multer({
    storage: multerS3({
      s3: s3Client,
      bucket: "best-kid-book-media",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (req, _file, cb) => {
        const bookId = (req as any).bookId as number;
        const mediaType = (req as any).mediaType as MediaTypeEnum;
        const randomUuid = uuid();
        const path = `${bookId}/${randomUuid}${mediaType === MediaTypeEnum.IMAGE ? ".jpg" : ".mp4"}`;
        cb(null, path);
      },
    }),
});
