import { db } from "@/app/lib/drizzle";
import { publicProcedure, router } from "./trpc";
import { todo } from "../db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const appRouter = router({
  // expose CRUD funtions for Todo app
  getTodo: publicProcedure.query(async () => {
    try {
      const data = (await db.select().from(todo)).reverse();
      return data;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error; // Rethrow the error to handle it elsewhere
    }
  }),

  addTodo: publicProcedure

    .input(
      z.object({
        content: z.string(),
      })
    )
    .mutation(async (opts) => {
      // id: serial("id").primaryKey(),
      // content: text("content").notNull(),
      // progress: text("progress").notNull(),
      // createdAt: timestamp("created_at").defaultNow(),
      await db
        .insert(todo)
        .values({ content: opts.input.content });

      return true;
    }),

  deleteTodo: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async (opts) => {
      //delete from db where id is equal to opts.input.id

      const deletedTodo = await db
        .delete(todo)
        .where(eq(todo.id, opts.input.id));
      return deletedTodo;
    }),

  updateTodo: publicProcedure
    .input(z.object({ content: z.string(), id: z.number() }))
    .mutation(async (opts) => {
      //update the content where id = opts.input.id
      const updatedTodo = await db
        .update(todo)
        .set({ content: opts.input.content })
        .where(eq(todo.id, opts.input.id));

        return updatedTodo
    }),
  updateTodoProgress: publicProcedure
    .input(z.object({ progress: z.boolean(), id: z.number() }))
    .mutation(async (opts) => {
      //update the progress where id = opts.input.id
      const updatedTodo = await db
        .update(todo)
        .set({ progress: opts.input.progress })
        .where(eq(todo.id, opts.input.id));

        return updatedTodo
    }),
});

export type AppRouter = typeof appRouter;
