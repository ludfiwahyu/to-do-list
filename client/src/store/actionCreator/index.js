import {
  FETCH_TASKS,
  SET_LOADING,
  SET_ERROR,
} from '../actionType/task';
import axios from "axios";

export const addNewTodos = (payload) => {
  return async (dispatch, getState) => {
    try {
      console.log(payload, "payload");
      const response = await axios({
        method: "POST",
        url: "http://localhost:3001/todos",
        data: payload,
      })
      const result = await response.data;
      const { tasks } = getState()
      const newTasks = [...tasks, result]
      console.log(newTasks, "newTasks");
      dispatch({
        type: FETCH_TASKS,
        payload: newTasks,
      })
    } catch (err) {
      dispatch(SET_ERROR(err))
    } finally { 
      dispatch(SET_LOADING(false))
    } 
  }
};