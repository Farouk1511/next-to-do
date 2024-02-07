"use server";

import { redirect } from "next/navigation";
import { serverClient } from "./_trpc/serverClient";

interface Todo {
  id?: number;
  content: string;
  progress?: boolean;
}

export const addTodo = async (data: FormData) => {
  const task: string = data.get("task")?.toString()!;

  const todoObj: Todo = {
    content: task,
  };

  await serverClient.addTodo(todoObj);

  redirect("/")
};

export const deleteTodo = async (id:number) => {


  await serverClient.deleteTodo({id})

  redirect("/")
}

export const updateTodo = async (id: number, content: string) => {
 
  await serverClient.updateTodo({id,content})

  redirect("/")
 
};

export const updateTodoProgress = async (id: number, progress: boolean) => {
 
  await serverClient.updateTodoProgress({id,progress})

  redirect("/")
  
};
