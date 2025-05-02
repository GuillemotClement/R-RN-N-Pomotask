import bcrypt from "bcrypt";
import { HashError } from "../errors/classError.js";
import { config } from "../config.js";
import jwt from "jsonwebtoken";

export async function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  try {
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  } catch (err) {
    throw new HashError("Failed hash");
  }
}

export async function checkPassword(password: string, hashedPassword: string) {
  try {
    return bcrypt.compareSync(password, hashedPassword);
  } catch (err) {
    throw new HashError("Failed check hash");
  }
}

export async function generateTokenJWT(userId: string) {
  const jwtSecretKey = config.jwt.secretKey;
  const expiresIn = 3600;

  if (!jwtSecretKey) {
    throw new Error("Secret key is not set");
  }

  const data = {
    userId,
  };

  const token = jwt.sign(data, jwtSecretKey, { expiresIn });

  return token;
}
