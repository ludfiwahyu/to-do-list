import {
  FETCH_TODOS,
  SET_LOADING,
  SET_ERROR,
} from "../actionType/todos";

const initailState = {
  todos: [],
  loading: false,
  error: null,
}

export default function todosReducer (state = initailState, action) {
  switch (action.type) {
    case FETCH_TODOS:
      return {
        ...state,
        todos: action.payload,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}