import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTodos } from "../store/actionCreator";
import { MDBContainer, MDBInput } from "mdbreact";

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
    });
    // console.log(item, "item");
  };

  const handleAddTodo = (e) => {
    setItem("");
    e.preventDefault();
    dispatch(addNewTodos(todos));
    console.log(todos, "todos");
  };

  return (
    <div>
      <MDBContainer>
        <div className="formAddTodo">
          <MDBInput
            value={todos.item}
            type="text"
            onChange={handleGetItem}
            label="Add New Todo"
          />
          <button onClick={handleAddTodo} type="button" className="btn btn-primary">Add</button>
          
        </div>
      </MDBContainer>
    </div>
  );
}
