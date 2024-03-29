"use client";

import React, { useEffect, useRef, useState } from "react";
import { trpc } from "../_trpc/client";
import { redirect } from "next/navigation";
import { deleteTodo, updateTodo, updateTodoProgress } from "../actions";

interface TodoProps {
  todo: any;
}

export const Todo = ({ todo }: TodoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState(todo?.content);
  const [progress, setProgress] = useState(todo?.progress);


  const handleEditClick = () => {
    setIsEditing(true);

    // Focus on the input field when edit button is clicked
  };

  const handleSaveClick = () => {
    setIsEditing(false);

    // Save the edited content (you might want to add logic to update the data)
    updateTodo(todo.id, input);
  };

  const handleProgressClick = () => {
    setProgress(!progress);
  };

  // useEffect to focus on the input when isEditing becomes true
  useEffect(() => {
    if (isEditing) {
      inputRef?.current?.focus();
    }
  }, [isEditing]);

  //any changes regarding progres
  useEffect(() => {
    updateTodoProgress(todo.id, progress);
    setIsEditing(false);
  }, [progress, todo.id]);

  return (
    <div
      key={todo?.id}
      className="border w-11/12 rounded-lg border-slate-500 flex justify-between items-center p-4 flex-grow"
    >
      {/*  <div className="flex items-center justify-center">
        <div className="w-8 h-8 rounded-full   mr-3"></div>

        <p className="line-through">Task 2</p>
      </div> */}
        <div
          className={`w-8 h-8 max-h-8 max-w-8 block rounded-full ${
            progress ? "bg-green-500" : "border-orange-700"
          } border mr-3`}
          onClick={handleProgressClick}
        ></div>
      <div className="flex items-center w-full mr-3">

        <div>
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              className="bg-transparent outline-none border-transparent p-1 rounded w-3/4"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          ) : (
            <div>
            <p
              className={`break-all overflow-hidden ${
                progress ? "line-through" : ""
              }`}
              >
              {todo?.content}
            </p>
            <p>{todo?.createdAt.toString()}</p>
            
              </div>
          )}
        </div>

        {/* <button
                  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                  
                >
                  {isEditing ? "Save" : "Edit"}
                </button> */}
      </div>

      {!progress && (
        <div className="flex space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={isEditing ? handleSaveClick : handleEditClick}
          >
            {!isEditing && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            )}
            {isEditing && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            )}
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={() => deleteTodo(todo.id)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
