import React, { useState, useContext } from "react"
import AuthForm from "./AuthForm.js"
import { UserContext } from "../context/UserProvider.js"

const initInputs = { username: "", password: "" }

const { signup, login } = useContext(UserContext)

export default function Auth(){
  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(false)

  function handleChange(e){
    const { name, value } = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      name,
      value
    }))
  }

  function handleSignup(e){
    e.preventDefault()
    signup(inputs)
  }

  function handleLogin(e){
    e.preventDefault()
    login(inputs)
  }
  return(
    <div>
      {!toggle ?
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Sign up"
          />
          <p onClick={() => setToggle(prev => !prev)}>Already a Member?</p>
        </>
      :
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
          />
          <p onClick={() => setToggle(prev => !prev)}>Not a member?</p>
        </>
      }
    </div>
  )
}