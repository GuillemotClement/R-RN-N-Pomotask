import { Request, Response, NextFunction } from "express";
import { BadRequestError, HashError } from "../errors/classError.js";

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

  console.error("🚨");
  console.error(`Code erreur : ${statusCode}`);
  console.error(`Message d'erreur : ${message}`);

  res.status(statusCode).json(message);
}
