import { pgTable, uuid, timestamp, varchar, text, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 100 }).unique().notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  image: varchar("image", { length: 255 }),
  password: varchar("password", { length: 255 }).notNull(),
  // valeur automatiquement ajouter par le SGBD
  createdAt: timestamp("created_at").notNull().defaultNow(),
  // la valeur se met a jour a chaque update de la ligne
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  // on doit passer via le js la valeur a stocker
  deleteAt: timestamp("delete_at"),
});
// permet de creer un nouveau type specifique pour l'insertion de nouvel utilisateur.
// typeof users -> recupere le type du shema users
// 4inferInsert -> methode utilitaire de Drizzle qui creer un type TS correspondant ce qui est necessaire pour l'insertion
export type NewUser = typeof users.$inferInsert;

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  describ: text("describ"),
  isDone: boolean("is_done").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  // la valeur se met a jour a chaque update de la ligne
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  // on doit passer via le js la valeur a stocker
  deleteAt: timestamp("delete_at"),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export type NewTask = typeof tasks.$inferInsert;
