import { FETCH_TODOS, SET_LOADING, SET_ERROR } from "../actionType/todos";
import axios from "axios";

export const addNewTodos = (payload) => {
  return async (dispatch, getState) => {
    try {
      console.log(payload, "payloadeadd");
      const response = await axios({
        method: "POST",
        url: "http://localhost:4000/todos",
        data:  payload
        ,
      });
      const result = await response.data;
      const { todos } = getState().todos;
      // console.log(result, "result");
      console.log(todos, "todosAtferAdd");
      const newTodos = [...todos, result];
      console.log(newTodos, "newTodos");
      dispatch({
        type: FETCH_TODOS,
        payload: newTodos,
      });
    } catch (err) {
      console.log(err, "errAdd");
      dispatch({ type: SET_ERROR, payload: err.response });
    }
  };
};

export const fetchTodos = () => {
  console.log("here");
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const result = await axios({
        method: "GET",
        url: "http://localhost:4000/todos",
      });
      console.log(result.data, "this");
      dispatch({ type: FETCH_TODOS, payload: result.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
};
