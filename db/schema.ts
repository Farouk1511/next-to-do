import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  progress: text("progress").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
