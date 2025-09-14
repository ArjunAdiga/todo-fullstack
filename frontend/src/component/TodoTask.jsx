import React from "react";
import { useEffect, useState } from "react";
import { BrushCleaning, ClipboardList, Trash } from "lucide-react";
import API from "./axios";

const TodoTask = () => {
  const [todoArray, setTodoArray] = useState([]);
  const [todoText, setTodoText] = useState(""); // Text in add todo input
  const [checkedTodos, setCheckedTodos] = useState([]);

  const getData = async () => {
    try {
      const res = await API.get("/todos");
      console.log(res.data);
      setTodoArray(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const addTodo = async () => {
    // Function that triggers on click of add button
      if (!todoText.trim()) return;
    try {
      const res = await API.post("/todos", { text: todoText });
      setTodoArray((prev) => [...prev, res.data]);
      setTodoText("");
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  //   const handleAllDelete = () => {
  //     setTodoArray((prev) =>
  //       prev.filter((item) => !checkedTodos.includes(item.id))
  //     );
  //     setCheckedTodos([]);
  //   };

  return (
    <>
      <div className="h-full">
        <div
          className="flex items-center justify-center"
          style={{ gap: "12px", marginBottom: "12px" }}
        >
          <ClipboardList size={34} />
          <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>To-do List</h2>
        </div>
        <div
          className="flex items-center justify-center flex-row"
          style={{ gap: "24px", marginTop: "24px" }}
        >
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTodo();
              }
            }}
            placeholder="Enter todo"
            className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            style={{ width: "50%" }}
          />
          <button
            type="button"
            disabled={!todoText}
            onClick={addTodo}
            className="py-2.5 px-5  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex items-center"
          >
            Add
          </button>
          {/* {checkedTodos?.length > 0 && (
            <Trash
              size={24}
              color="red"
              onClick={() => handleAllDelete()}
              style={{ cursor: "pointer" }}
            />
          )} */}
        </div>
        {todoArray?.length === 0 ? (
          <div
            className="flex items-center justify-center flex-col"
            style={{ height: "60vh", gap: "12px" }}
          >
            <BrushCleaning size={48} />
            <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>No todos</h2>
          </div>
        ) : (
          <div
            className="flex items-center justify-center flex-col"
            style={{
              marginTop: "24px",
              gap: "4px",
              border: "1px solid #525252",
              borderRadius: "8px",
              padding: "8px",
            }}
          >
            {todoArray?.map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                setTodoArray={setTodoArray}
                setCheckedTodos={setCheckedTodos}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TodoTask;
