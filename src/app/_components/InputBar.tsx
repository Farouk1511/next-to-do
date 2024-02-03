import React from "react";

const InputBar = ({ addTodoList, setInput, input }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTodoList();
    }
  };

  return (
    <div className="w-1/3 mt-10 flex justify-between items-center">
      <input
        placeholder="write your next task"
        className="outline-none text-sm w-10/12 p-2 px-4 rounded-xl bg-zinc-800 "
        value={input}
        onChange={(e) => {
          e.preventDefault();
          setInput(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      <div
        onClick={addTodoList}
        className="w-10 h-10 cursor-pointer bg-orange-700 rounded-full flex justify-center items-center text-2xl font-extrabold text-black"
      >
        +
      </div>
    </div>
  );
};

export default InputBar;
