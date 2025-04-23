import express from "express";
import { postNewBookData } from "~src/svc/modules/book/controller";

export const bookRouter = express.Router();

bookRouter.post("/", postNewBookData);
