import React from 'react';
import '../../App.js';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

class Login extends React.Component {

  
  state = {
    username: '',
    password: '',
    usertype: ''
    
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
    
  }

  loginUser = (username, password) => {
    const url = '/api/users/login'
    const request = new Request(url, {
      method: 'post', 
      body: JSON.stringify({username: username, password: password}),
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
      },
    });
    fetch(request)
    .then((res) => {
      console.log(res.url)
      const lastPart = res.url.split('/').pop()

      console.log(lastPart)
      if (lastPart === 'RegularHome') {
        console.log('user')
        this.props.app.currentUser = username
        this.setState({
          usertype: 'user'
        })
      }
      else if (lastPart === 'AdminHome') {
        this.setState({
          usertype: 'admin'
        })
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const username = this.state.username
    const password = this.state.password
    this.loginUser(username, password)
    if (this.state.usertype === 'user') {
      this.props.islogin(true, false)
    }
    else if (this.state.usertype === 'admin') {
      this.props.islogin(false, true)
    }
    /*if (username === "admin" && password === "admin") {
      this.props.islogin(false, true)
    }else if (username === "user" && password === "user") {
      this.props.islogin(true, false)
    }*/
    
  }

  render() {
    return (
      <div className='Login center'>
        <h1>Login Page</h1>
          <form id='bookAddForm'>
            <label htmlFor="username">Username</label>
            <input className='LoginInput' value={ this.state.username } onChange= { this.handleInputChange } name='username' id='username' type="text" placeholder="put your username here"/>
            <label htmlFor="password">Password</label>
            <input className='LoginInput' value={ this.state.password } onChange= { this.handleInputChange } name='password' id='password' type="text" placeholder="put your password here"/>
            <Button className='small-button' id='login' onClick={ this.handleSubmit }>Log In</Button>
            
 	        </form>
        <Link className = "signup-link" to = {"./Signup"}>
          <Button className = "small-button"> Sign up </Button>
        </Link>
      </div>
    )
  }
}

export default Login;
