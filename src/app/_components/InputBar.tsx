"use client";
import React, { useState } from "react";
import { addTodo } from "../actions";

const InputBar = () => {
  const [task, setTask] = useState("");

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("task", task);

    //server actions
    addTodo(formData);
    
    setTask("");
  };

  return (
    <form className="w-11/12 mt-10 flex" onSubmit={(e) => e.preventDefault()}>
      <input
        placeholder="write your next task"
        className="outline-none text-sm w-5/6 2xl:w-11/10 p-2 px-4 rounded-xl bg-zinc-800 "
        name="task"
        onChange={(e) => {
          setTask(e.target.value);
        }}
        value={task}
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className="ml-4 w-10 h-10 cursor-pointer bg-orange-700 rounded-full flex justify-center items-center text-2xl font-extrabold text-black"
      >
        +
      </button>
    </form>
  );
};

export default InputBar;
