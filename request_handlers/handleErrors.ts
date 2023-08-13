import { NextFunction } from "express";

export async function handleErrors(req: Request, res: Response, next: NextFunction, callback: Function) {
    try {
        callback(req, res, next);
    } catch (error) {
        next(error);
    }
}