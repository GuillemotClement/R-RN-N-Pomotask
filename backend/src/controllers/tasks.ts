import { Request, Response } from "express";
import { createTask, listTask } from "../db/queries/taskQueries.js";
import { BadRequestError } from "../errors/classError.js";

export async function handleCreateTask(req: Request, res: Response) {
  type parameters = {
    title: string;
    describ?: string;
    userId: string;
  };

  const params: parameters = req.body;

  if (!params.title || !params.userId) {
    throw new BadRequestError("Missing required field");
  }

  const task = await createTask({
    title: params.title,
    describ: params.describ,
    userId: params.userId,
  });

  if (!task) {
    throw new Error("Could not create task");
  }

  res.status(201).json({
    id: task.id,
    title: task.title,
    describ: task.describ,
    isDone: task.isDone,
    createdAt: task.createdAt,
  });
}

export async function handleListTask(req: Request, res: Response) {
  type parameters = {
    userId: string;
  };

  const params: parameters = { userId: req.userId ?? "" };

  if (!params.userId) {
    throw new BadRequestError("Missing required field");
  }

  const tasks = await listTask(params.userId);

  if (!tasks) {
    throw new Error("No tasks find");
  }

  res.status(200).json({ tasks });
}
