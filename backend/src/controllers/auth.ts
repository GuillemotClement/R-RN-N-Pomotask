import { Request, Response } from "express";
import { createUser } from "../db/queries/userQueries.js";
import { NewUser } from "../db/schema.js";
import { BadRequestError } from "../errors/classError.js";
import { hashPassword } from "../utils/crypto.js";

export async function handleCreateUser(req: Request, res: Response) {
  type parameters = {
    username: string;
    email: string;
    image: string;
    password: string;
  };

  const params: parameters = req.body;

  if (!params.email || !params.password || !params.username) {
    throw new BadRequestError("Missing required fields");
  }

  const hashedPassword = await hashPassword(params.password);

  const user = await createUser({
    username: params.username,
    email: params.email,
    image: params.image,
    password: hashedPassword,
  } satisfies NewUser);

  if (!user) {
    throw new Error("Could not create user");
  }

  res.status(201).json({
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    image: user.image,
  });
}
