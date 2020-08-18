import React from 'react';
import './App.css';
import NavBar from './containers/NavBar'
import HomePage from './containers/HomePage'
import Login from './components/Login'
import Profile from './containers/Profile'
import { Route, Redirect } from "react-router-dom";

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
 
  handleLogin = (user) => {
    this.setState({ user: user })
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState({user: null})
  }

  render(){
    return(
      <div className="App">
        <NavBar user={this.state.user} logout={this.handleLogout}/>
        <Route exact path="/" render={() => <HomePage user={this.state.user}/>}/>
        { this.state.user ? 
        <Redirect to= "/"/>
        :
        <Route exat path="/login" render={() => <Login login={this.handleLogin}/>}/>
        }
        <Route exact path="/profile" render={() => <Profile />} />
      </div>
    )
  }
}

export default App