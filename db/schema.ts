import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  progress: boolean("progress").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
