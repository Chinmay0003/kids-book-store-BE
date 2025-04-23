import express from "express";
import { postNewBookData, postNewBookMedia } from "~src/svc/modules/book/controller";

export const bookRouter = express.Router();

bookRouter.post("/", postNewBookData);
bookRouter.post("/media", postNewBookMedia);
