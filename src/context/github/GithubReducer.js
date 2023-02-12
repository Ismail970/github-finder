const githubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS": return {
      ...state,
      users: action.payload,
      loading: false,
      error: false,
    }
    case "GET_USER": return {
      ...state,
      user: action.payload,
      loading: false,
      error: false,
    }
    case "GET_REPOS": return {
      ...state,
      repos: action.payload,
      loading: false,
    }
    case "SET_LOADING": return {
      ...state,
      loading: true,
    }
    case "SET_ERROR": return {
      ...state,
      error: true,
      loading: false,
    }
    case "REMOVE_ERROR": return {
      ...state,
      error: false,
    }
    case "CLEAR_USERS": return {
      ...state,
      users: [],
    }
    default: return state
  }
}

export default githubReducer