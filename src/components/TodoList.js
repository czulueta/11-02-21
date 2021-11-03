import React from "react"


export default function TodoList(props){
  const { todos } = props
  return(
    <div className="todos-list">
      { todos.map(todo => <Todo {...todo} key={todo._id}/>)}
    </div>
  )
}