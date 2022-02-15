import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodos } from "../store/actionCreator";

export default function AddTodo() {
  const dispatch = useDispatch();
  
  const [item, setItem] = useState("");
  const [status] = useState("uncompleted");
  const [todos, setTodos] = useState({
    item,
    status,
  });

  const handleGetItem = (e) => {
    const { value } = e.target;
    setItem(value);
    setTodos({
      ...todos,
      item: value,
    })
    // console.log(item, "item");
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    dispatch(addNewTodos(todos))
    console.log(todos, "todos");
  };

  return (
    <div>
      <div className="formAddTodo">
        <input value={todos.item} type="text" placeholder="Add Todos" onChange={handleGetItem} />
        <button onClick={handleAddTodo} >Add</button>
      </div>
    </div>
  );
}
