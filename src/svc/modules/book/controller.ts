import { NextFunction, Request, Response } from "express";
import { PostNewBookSchema } from "~src/svc/modules/book/schemas";
import { PostNewBookRequest } from "~src/svc/modules/book/types";
import { postNewBookDataToDB } from "~src/svc/modules/book/utils/utils";

export const postNewBookData = async (
    req: Request,
    res: Response,
    next: NextFunction,
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
    await postNewBookDataToDB(data, req, res, next);
    res.status(200).json({ status: "OK" });
};
