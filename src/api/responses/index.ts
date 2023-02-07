import { Request, Response } from "express";

import { HttpError } from "../errors/http/HttpError.js";

export function sendRes(res: Response, err: HttpError | Error | null, data: any={}): void {
    if (err instanceof HttpError) {
        res.status(err.httpCode).send({ 'message': err.message });
    } else if (err instanceof Error) {
        res.status(500).send({ 'message': err.message });
    } else {
        res.status(200).send(data);
    }
}