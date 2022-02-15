import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import tasksReducer from "./reducers/taskReducer";

const store = createStore(
  combineReducers({
    tasks: tasksReducer,
  }), applyMiddleware(thunk)
);

export default store