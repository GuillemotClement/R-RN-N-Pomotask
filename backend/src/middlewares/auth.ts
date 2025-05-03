import { ne } from "drizzle-orm";
import { config } from "../config.js";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { respondWithError } from "src/utils/json.js";

type IDataToken = {
  userId: string;
  iat: number;
  exp: number;
};

// export interface CustomeRequest extends Request {
//   userId: string;
// }

export function checkToken(req: Request, res: Response, next: NextFunction) {
  const tokenHeaderKey = config.jwt.tokenHeader ?? "";
  const jwtSecretKey = config.jwt.secretKey ?? "";

  const token = req.header(tokenHeaderKey) ?? "";

  if (!token) {
    throw new Error("Token is not set");
    // return res.status(401).json({ erreur: "Token is not set" });
  }

  const decoded = jwt.verify(token, jwtSecretKey);

  if (typeof decoded !== "object" || decoded === null || !("userId" in decoded)) {
    throw new Error("Token is invalide");
    // return res.status(403).json({ erreur: "Token invalide" });
  }

  const verified = decoded as IDataToken;

  req.userId = verified.userId;

  next();
}
