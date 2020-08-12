import React from 'react';
import './App.css';
import NavBar from './containers/NavBar'
import HomePage from './containers/HomePage'
import Login from './components/Login'
import { Route } from "react-router-dom";

class App extends React.Component{
  state = {
    user: null
  }

  componentDidMount(){
    if(localStorage.getItem("token")){
      fetch("http://localhost:3000/login", {
        headers: { "Authenticate": localStorage.token }
      })
      .then(resp => resp.json())
      .then(user => {
        this.handleLogin(user)
      })
      } else {
        console.log("No Token Found")
      }
  }

  loggedInUser = (user) => {
    
  }

  render(){
    return(
      <div>
        <NavBar />
        <Route exact path="/home" render={() => <HomePage />}/>
        <Route exat path="/login" render={() => <Login />}/>
      </div>
    )
  }
}

export default App