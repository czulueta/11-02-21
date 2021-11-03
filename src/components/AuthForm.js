import React from "react"


export default function AuthForm(){
  return (
    <form onSubmit={handleSubmit}>
      <input 
        text="text"
        name="username"
        value={username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input 
        text="text"
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button>{ btnText }</button>
    </form>
  )
}