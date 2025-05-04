import { NewTask, tasks } from "../schema.js";
import { db } from "../index.js";
import { eq, isNull, sql, and } from "drizzle-orm";

export async function createTask(task: NewTask) {
  const [result] = await db.insert(tasks).values(task).onConflictDoNothing().returning();
  return result;
}

export async function listTask(userId: string) {
  const result = await db
    .select()
    .from(tasks)
    .where(and(eq(tasks.userId, userId), isNull(tasks.deleteAt)));
  return result;
}

export async function detailTask(taskId: string) {
  const [result] = await db.select().from(tasks).where(eq(tasks.id, taskId));
  return result;
}

export async function updateFinishTask(taskId: string) {
  const [result] = await db
    .update(tasks)
    .set({ isDone: true })
    .where(eq(tasks.id, taskId))
    .returning();
  return result;
}

export async function updateToDoTask(taskId: string) {
  const [result] = await db
    .update(tasks)
    .set({ isDone: false })
    .where(eq(tasks.id, taskId))
    .returning();
  return result;
}

export async function deleteTask(taskId: string) {
  const [result] = await db
    .update(tasks)
    .set({ deleteAt: sql`NOW()` })
    .where(eq(tasks.id, taskId))
    .returning();
  return result;
}
