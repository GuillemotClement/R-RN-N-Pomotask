import { NewUser, users } from "../schema.js";
import { db } from "../index.js";
import { eq } from "drizzle-orm";

export async function createUser(user: NewUser) {
  const [result] = await db.insert(users).values(user).onConflictDoNothing().returning();
  return result;
}

export async function getUserByUsername(username: string) {
  const [result] = await db.select().from(users).where(eq(users.username, username));
  return result;
}
