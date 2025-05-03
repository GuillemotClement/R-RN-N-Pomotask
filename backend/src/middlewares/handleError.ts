import { Request, Response, NextFunction } from "express";
import { BadRequestError, HashError } from "../errors/classError.js";
import { respondWithError } from "../utils/json.js";

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  let statusCode = 500;
  let message = "Something went wrong on our end";

  if (err instanceof BadRequestError) {
    statusCode = 400;
    message = err.message;
  } else if (err instanceof HashError) {
    statusCode = 500;
    message = err.message;
  }

  respondWithError(res, statusCode, message);
}
