import React from "react";

interface InputBarProps {
  addTodoList: any;
  setInput: any;
  input: any;
}

const InputBar = ({ addTodoList, setInput, input }: InputBarProps) => {
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && event.target.value !== "") {
      addTodoList();
    }
  };

  return (
    <div className="w-11/12 mt-10 flex ">
      <input
        placeholder="write your next task"
        className="outline-none text-sm w-5/6 2xl:w-11/10 p-2 px-4 rounded-xl bg-zinc-800 "
        value={input}
        onChange={(e) => {
          e.preventDefault();
          if (e.target.value !== "") setInput(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      <div
        onClick={addTodoList}
        className="ml-4 w-10 h-10 cursor-pointer bg-orange-700 rounded-full flex justify-center items-center text-2xl font-extrabold text-black"
      >
        +
      </div>
    </div>
  );
};

export default InputBar;
