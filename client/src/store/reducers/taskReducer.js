const initailState = {
  tasks: [],
  set_loading: false,
  set_error: null,
}

export default function tasksReducer (state = initailState, action) {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
      }
    case 'SET_TASKS_LOADING':
      return {
        ...state,
        set_loading: action.payload,
      }
    case 'SET_TASKS_ERROR':
      return {
        ...state,
        set_error: action.payload,
      }
    default:
      return state
  }
}