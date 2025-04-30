import express from "express";
import { getAllBooks, postNewBookData, postNewBookMedia, updateBookData } from "~src/svc/modules/book/controller";

export const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);
bookRouter.post("/", postNewBookData);
bookRouter.put("/", updateBookData);
bookRouter.post("/media", postNewBookMedia);
