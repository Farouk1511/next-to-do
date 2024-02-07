import InputBar from "./_components/InputBar";
import { Todo } from "./_components/Todo";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  auth,
} from "@clerk/nextjs";
import { serverClient } from "./_trpc/serverClient";
import { UpdateModal } from "./_components/UpdateModal";
import { Suspense } from "react";

interface Todo {
  id?: number;
  content: string;
  progress?: boolean;
}

export default async function Home() {
  const getTodo = await serverClient.getTodo();
  const data = getTodo;

  const sortObjectsByProgress = (inputArray: Todo[]) => {
    return inputArray?.sort((a, b) =>
      a.progress === b.progress ? 0 : a.progress ? 1 : -1
    );
  };
  function filterObjectsByProgress(inputArray: Todo[]) {
    return inputArray?.filter((obj) => obj.progress === true);
  }

  const { userId, sessionId, getToken } = auth();
  return (
    <main className="bg-black h-screen flex flex-col items-center font-mono center text-white overflow-y-auto overflow-x-hidden pb-9">
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
      <InputBar />

      <div className="p-3">
        <p className="mt-3 text-sm">
          {" "}
          * If u get this pre link write a todo with your name or alias *
        </p>
      </div>

      {!data && <p>Something went wrong!</p>}
      {!data && <p>Something went wrong! </p>}
      {/* TO DO LIST */}
      <div className="mt-6 sm:mt-8 md:mt-12 w-full flex items-center justify-center flex-col space-y-4">
        {!data && <p>Loading...</p>}
        <Suspense fallback={<p>Loading...</p>}>
        {sortObjectsByProgress(data!)?.map((todo: Todo) => (
          <Todo todo={todo} key={todo.id} />
        ))}

        </Suspense>
      </div>

      {/* Modal */}
      <UpdateModal />
    </main>
  );
}

