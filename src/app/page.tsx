"use client";
import InputBar from "./_components/InputBar";
import { useEffect, useRef, useState } from "react";
import { trpc } from "./_trpc/client";
import { json } from "stream/consumers";
import { Todo } from "./_components/Todo";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  auth,
  useAuth,
} from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";

interface Todo {
  id?: number;
  content: string;
  progress?: boolean;
}

export default function Home() {
  const getTodo = trpc.getTodo.useQuery();
  const [modal, setModal] = useState(true);

  const { data, isLoading, error } = getTodo;

  const mutation = trpc.addTodo.useMutation({
    onSettled(data, error, variables, context) {
      getTodo.refetch();
    },
  });

  const deleteMutation = trpc.deleteTodo.useMutation({
    onSettled(data, error, variables, context) {
      getTodo.refetch();
    },
  });

  const updateMutation = trpc.updateTodo.useMutation({
    onSettled(data, error, variables, context) {
      getTodo.refetch();
    },
  });

  const updateProgressMutation = trpc.updateTodoProgress.useMutation({
    onSettled(data, error, variables, context) {
      getTodo.refetch();
    },
  });

  const [input, setInput] = useState("");

  const addTodoList = () => {
    const todoObj: Todo = {
      content: input,
    };

    mutation.mutate(todoObj);
    setInput("");
  };

  const deleteTodo = (id: number) => {
    deleteMutation.mutate({ id });
  };

  const updateTodo = (id: number, content: string) => {
    updateMutation.mutate({ id, content });
  };
  const updateTodoProgress = (id: number, progress: boolean) => {
    updateProgressMutation.mutate({ id, progress });
  };

  function sortObjectsByProgress(inputArray: Todo[]) {
    return inputArray?.sort((a, b) =>
      a.progress === b.progress ? 0 : a.progress ? 1 : -1
    );
  }
  function filterObjectsByProgress(inputArray: Todo[]) {
    return inputArray?.filter((obj) => obj.progress === true);
  }

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  return (
    <main className="bg-black h-screen flex flex-col items-center font-mono center text-white overflow-y-auto overflow-x-hidden">
      {/* Header */}
      <div className="flex justify-between w-full sm:px-4 md:px-12 py-6 px-6">
        <div>Hello Todo list</div>

        <div className="flex gap-2">
          {!!userId && <UserButton />}
          {!userId && <SignInButton />}
          {!!userId && <SignOutButton />}
        </div>
      </div>
      {/* Main todo box */}
      <div className="flex center justify-center border-2 border-slate-500 rounded-lg w-5/6 sm:w-5/6 md:w-1/3 h-40 py-5">
        <div className="flex justify-between w-full px-4 sm:px-5 md:px-10 items-center">
          <div>
            <p className="text-sm sm:text-lg md:text-3xl font-bold">
              Todo Done
            </p>
            <span className="tracking-widest">Keep it up</span>
          </div>

          <div className="rounded-full w-28 sm:w-16 md:w-24 h-28 sm:h-16 md:h-24 flex items-center justify-center bg-orange-700 text-xl sm:text-lg md:text-4xl font-extrabold text-black">
            {data?.length! > 0
              ? `${filterObjectsByProgress(data!).length}/${data?.length}`
              : "-"}
          </div>
        </div>
      </div>

      {/* Input todo list */}
      <InputBar addTodoList={addTodoList} setInput={setInput} input={input} />

      <div className="p-3">
        <p className="mt-3 text-sm">
          {" "}
          * If u get this pre link write a todo with your name or alias *
        </p>
      </div>

      {mutation.error && <p>Something went wrong! {mutation.error.message}</p>}
      {getTodo.error && <p>Something went wrong! {getTodo.status}</p>}
      {/* TO DO LIST */}
      <div className="mt-6 sm:mt-8 md:mt-12 w-full flex items-center justify-center flex-col space-y-4">
        {isLoading && <p>Loading...</p>}
        {sortObjectsByProgress(data!)?.map((todo: Todo) => (
          <Todo
            todo={todo}
            deleteTodo={deleteTodo}
            key={todo.id}
            updateTodo={updateTodo}
            updateTodoProgress={updateTodoProgress}
          />
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div
          id="default-modal"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full text-black"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold  dark:text-white">
                  New Updates
                </h3>
                <button
                  onClick={() => setModal(false)}
                  type="button"
                  className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                >
                  <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5 space-y-4">
                <ul>
                  <li>- Progress button working now</li>
                  <li>- Sorts completed todo to end</li>
                  <li>- Optimized DB queries</li>
                </ul>
              </div>

              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="button"
                  className="text-white bg-orange-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => setModal(false)}
                >
                  Say Less
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

{
  /* <div className="border w-1/5 h-14 rounded-lg border-slate-500 flex justify-between items-center p-4">
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 rounded-full  bg-green-500 mr-3"></div>

        <p className="line-through">Task 2</p>
      </div>

      <div className="flex space-x-2">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
          >
          <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
          >
          <path
          strokeLinecap="round"
          strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
        </div>
        </div>
        
        <div className="border w-1/5 h-14 rounded-lg border-slate-500 flex justify-between items-center p-4">
        <div className="flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-orange-700 border mr-3"></div>
        
        <span>Task 3</span>
      </div>

      <div className="flex space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
          >
          <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
          </svg>
          
          <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
          </svg>
          </div>
        </div> */
}
