import express from "express";
import { getAllBooks, postNewBookData, postNewBookMedia } from "~src/svc/modules/book/controller";

export const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);
bookRouter.post("/", postNewBookData);
bookRouter.post("/media", postNewBookMedia);
