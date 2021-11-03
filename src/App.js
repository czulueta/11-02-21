import React, { useContext } from "react"
import Navbar from "./Navbar.js"
import Auth from "./Auth.js"
import Profile from "./Profile.js"
import Public from "./Public.js"
import { Switch, Route, Redirect } from "react-router-dom"
import { UserContext } from "./context/UserProvider.js"

export default function App(){
  const { token, logout } = useContext(UserContext)
  return(
    <div>
      <Navbar logout={logout}/>
      <Switch>
        <Route 
          exact path=""
          render={() => token ? <Redirect to="/profile"/> : <Auth  />}   
        />
        <Route 
          path="profile"
          render={() => <Profile  />}   
        />
        <Route 
          path="public"
          render={() => <Public  />}
        />
      </Switch>
    </div>
  )
}
