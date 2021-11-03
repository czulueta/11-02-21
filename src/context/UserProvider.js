import React, { useState } from "react"

export const { UserContext } = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function UserProvider(props){
  const initState = { 
    user: JSON.parse(localStorage.getItem("user")) || { }, 
    toke: localStorage.getItem("token") || "", 
    todos: []
  }
  const [ userState, setUserState ] = useState(initState)

  function signup(credentials){
    axios.get("/api/signup", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token")
        localStorage.setItem("user", JSON.stringify(user))
        setUserState(prevUserState => ({
          ...prevUserState,
          token,
          user
        }))
      })
      .catch(err => console.log(err.respones.data.errMsg))
  }

  function login(credentials){
    axios.get("/api/login", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("toke")
        localStorage.setItem("user", JSON.stringify(user))
        getUserTodos()
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  function logout(){
    localStorage.removeItem("token")
    localStorage.remvoeItem("user")
    setUserState({
      user: {},
      todos: [],
      token: ""
    })
  }

  function getUserTodos(){
    userAxios.get("/api/todo/user")
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          todos: res.data
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  function addTodo(newTodo){
     userAxios.post("/api/todo", newTodo)
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          todos: [...prevState.todos, res.data]
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }
  return(
    <UserContext.Provider value={{
      ...userState,
      signup,
      login,
      logout,
      addTodo
    }}>
      { props.children }
    </UserContext.Provider>
  )
}