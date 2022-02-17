import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import todosReducer from "./reducers/todosReducer";

const store = createStore(
  combineReducers({
    todos: todosReducer,
  }), applyMiddleware(thunk)
);

export default store