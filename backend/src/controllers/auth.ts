import { Request, Response } from "express";
import { createUser, getUserByUsername } from "../db/queries/userQueries.js";
import { NewUser } from "../db/schema.js";
import { BadRequestError, ErrorAuthenticate } from "../errors/classError.js";
import { checkPassword, generateTokenJWT, hashPassword } from "../utils/crypto.js";

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

export async function handleLoginUser(req: Request, res: Response) {
  type parameters = {
    username: string;
    password: string;
  };

  type userFromDatabase = {
    id: string;
    username: string;
    email: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    password: string;
  };

  const params: parameters = req.body;

  if (!params.username || !params.password) {
    throw new BadRequestError("Missing required fields");
  }

  const userFromDatabase: NewUser = await getUserByUsername(params.username);

  if (!userFromDatabase.id) {
    throw new ErrorAuthenticate("Credentials not good");
  }

  const passwordIsGood = await checkPassword(params.password, userFromDatabase.password);

  if (!passwordIsGood) {
    throw new ErrorAuthenticate("Credentials not good");
  }

  const token = await generateTokenJWT(userFromDatabase.id);
  if (!token) {
    throw new ErrorAuthenticate("Token is not generate");
  }

  res.status(200).json({
    id: userFromDatabase.id,
    username: userFromDatabase.username,
    email: userFromDatabase.email,
    image: userFromDatabase.image,
    createdAt: userFromDatabase.createdAt,
    updatedAt: userFromDatabase.updatedAt,
    token: token,
  });
}
