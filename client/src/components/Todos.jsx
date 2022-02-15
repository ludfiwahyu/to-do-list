import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos } from "../store/actionCreator";
import "./Todos.css";

export default function Todos() {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  console.log(todos, loading, error, "todosssssss");
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {todos.map((el) => {
            return (
              <div
                className={todos.status ? "todo-row complete" : "todo-row"}
                key={el.id}
              >
                <div key={el.id}>
                  <div>{el.item}</div>
                  <div>{el.status}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
