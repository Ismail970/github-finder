import { createStaticHandler } from '@remix-run/router'
import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    error: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get search resaults
  const searchUsers = async text => {
    try {
      setLoading()

      const params = new URLSearchParams({
        q: text
      })

      const res = await fetch(`${GITHUB_URL}/search/users?${params}`)
      // failure test
      // const res = await fetch("https://httpstat.us/404")

      const { items } = await res.json()

      dispatch({
        type: "GET_USERS",
        payload: items,
      })
    } catch {
      dispatch({ type: "SET_ERROR" })
      setTimeout(() => dispatch({ type: "REMOVE_ERROR" }), 3000)
    }
  }

  // Get a single user
  const getUser = async login => {
    try {
      setLoading()

      const res = await fetch(`${GITHUB_URL}/users/${login}`)

      if (!res.ok) {
        window.location = "/notfound"
        return
      }

      const data = await res.json()

      dispatch({
        type: "GET_USER",
        payload: data,
      })
    } catch {
      dispatch({ type: "SET_ERROR" })
      setTimeout(() => dispatch({ type: "REMOVE_ERROR" }), 5000)
    }
  }

  // Get user repos
  const getUserRepos = async login => {
    try {
      setLoading()

      const res = await fetch(`${GITHUB_URL}/users/${login}/starred`)

      const data = await res.json()

      dispatch({
        type: "GET_REPOS",
        payload: data,
      })
    } catch {
      dispatch({ type: "SET_ERROR" })
      setTimeout(() => dispatch({ type: "REMOVE_ERROR" }), 3000)
    }
  }

  // Set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" })

  // Clear users
  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' })

  return (
    <GithubContext.Provider value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      error: state.error,
      searchUsers,
      clearUsers,
      getUser,
      getUserRepos,
    }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext