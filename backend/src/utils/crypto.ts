import bcrypt from "bcrypt";
import { HashError } from "../errors/classError.js";

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
