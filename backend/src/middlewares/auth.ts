import { config } from "../config.js";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function checkToken(req: Request, res: Response, next: NextFunction) {
  const tokenHeaderKey = config.jwt.tokenHeader ?? "";
  const jwtSecretKey = config.jwt.secretKey ?? "";

  try {
    const token = req.header(tokenHeaderKey) ?? "";

    if (!token) {
      res.status(401).json({ erreur: "Token is not set" });
    }

    const verified = jwt.verify(token, jwtSecretKey);

    if (!verified) {
      res.status(403).json({ erreur: "Token is invalide" });
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ erreur: "Failed authenticate" });
  }
}

// function checkDroit

// recupere is du user avec le token
// recupere les infos de droit de l'user
// si droit ok alors on accede a la page demander.
