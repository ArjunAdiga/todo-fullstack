import React from 'react'
import { useEffect, useRef, useState } from "react";
import { Pencil, Trash  } from "lucide-react";
import API from './axios';

const TodoItem = ({key,item,setTodoArray,setCheckedTodos}) => {
    const [isEdit, setIsEdit] = useState(false); // to edit
  const [isCompleteTodo, setIsCompleteTodo] = useState(!!item?.isComplete); //  for checkbox
  const [hover, setHover] = useState(false);
  const [editedText, setEditedText] = useState(item?.text);
  const ref = useRef(null);

    useEffect(() => {
    if (isEdit && ref.current) {
      const textarea = ref.current;
    textarea.focus();
    // Move cursor to end of text
    const length = textarea.value.length;
    textarea.setSelectionRange(length, length);
    }
  }, [isEdit]);

  useEffect(() => {     // to update isChecked and text
  setIsCompleteTodo(!!item?.isComplete);
  setEditedText(item?.text)
}, [item]);

  const handleOnCheck = async (e,id,current) => { 
    // setIsCompleteTodo((prev) => !prev);
    // setTodoArray((prev) =>
    //   prev.map((todo) =>
    //     todo.id === item?.id ? { ...todo, isComplete: !todo?.isComplete } : todo
    //   )
    // );
    // if(e.target.checked == true) {
    //     setCheckedTodos((prev) => ([...prev,id]))
    // }
    // else {
    //     setCheckedTodos((prev) => prev.filter(item => item !== id))
    // }

    try{
      const res = await API.patch(`/todos/${id}`, { isComplete: !current });
      setTodoArray((prev) =>
      prev.map((todo) => (todo._id === id ? res.data : todo))
    );
    // if (e.target.checked) {
    //   setCheckedTodos((prev) => [...prev, id]);
    // } else {
    //   setCheckedTodos((prev) => prev.filter((item) => item !== id));
    // }
    } catch(err){
       console.error("Error updating todo:", err);
    }
  };

   const handleEdit = async (id, text) => {
  try {
    const res = await API.patch(`/todos/${id}`, { text });
    setTodoArray((prev) =>
      prev.map((todo) => (todo._id === id ? res.data : todo))
    );
    if (ref.current) ref.current.blur();
    setIsEdit(false);
  } catch (err) {
    console.error("Error editing todo:", err);
  }
};

const handleDelete = async (id) => {
  try {
    await API.delete(`/todos/${id}`);
    setTodoArray((prev) => prev.filter((item) => item._id !== id));
  } catch (err) {
    console.error("Error deleting todo:", err);
  }
};

  return (
    <>
      <div
        className="flex items-center p-2 w-full"
      key={key}
        style={{ gap: "8px" }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <input
          checked={isCompleteTodo}
          onChange={(e) => handleOnCheck(e,item.id,item.isComplete)}
          id="checked-checkbox"
          type="checkbox"
          style={{marginRight:"12px"}}
          className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-blue-500 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
        />
        {!isEdit ? (
          <h4
            styles={{
              width: "85%",
              textDecoration: isCompleteTodo ? "line-through" : "none",
              maxWidth: "85%",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {item?.text}
          </h4>
        ) : (
          <>
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              rows={1}
              ref={ref}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleEdit(editedText);
                }
              }}
              onBlur={() => handleEdit(editedText)}
              style={{
                border: "none",
                outline: "none",
                fontSize: "14px",
                overflow: "auto",
                overflowY: "auto",
                maxHeight: "75px",
                scrollbarWidth: "none",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                width: "85%",
                padding: "4px 2px 4px 0px",
                resize: "none",
                backgroundColor: "#fffafa",
              }}
            />
          </>
        )}
        {hover && (
          <div
            className="flex items-center justify-end"
            style={{ width: "10%", gap: "18px" }}
          >
            <Pencil
              size={16}
              onClick={() => {
                setIsEdit(true);
              }}
              style={{ cursor: "pointer" }}
            />
            <Trash
              size={16}
              color="red"
              onClick={() => handleDelete(item?.id)}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default TodoItem