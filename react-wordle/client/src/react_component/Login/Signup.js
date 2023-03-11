import React from 'react';
import '../../App.js';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

class Signup extends React.Component {

    state = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        age: 0
        }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
    
  }

  createUser = (event) => {
    event.preventDefault()

    const url = '/api/users'

    let data = {
      username: this.state.username,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      totalGames: 0,
      wins: 0,
      losses: 0,
      winStreak: 0
    }
    
    const url2 = `/api/users/${data.username}`
    fetch(url2)
    .then((res) => { 
      console.log(res.status)
      if (res.status === 404) {
        const request = new Request(url, {
          method: 'post', 
          body: JSON.stringify(data),
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
          },
        });
    
        fetch(request)
        .then(function(res) {
            if (res.status === 200) {
                console.log('Added user') 
                alert('Your account has been created')
            } else {
                alert('Could not create account')
                console.log('Could not add user')
            }
        }).catch((error) => {
            console.log(error)
        })
     } else if (res.status === 200) {
        alert('This username is already taken')
     }                
    })


  }

  render() {
    return (
      <div className='Signup center'>
        <h1>Create an Account</h1>
          <form id='bookAddForm'>
            <label htmlFor="username">Username</label>
            <input className='LoginInput' value={ this.state.username } onChange= { this.handleInputChange } name='username' id='username' type="text" placeholder="put your username here"/>
            <label htmlFor="password">Password</label>
            <input className='LoginInput' value={ this.state.password } onChange= { this.handleInputChange } name='password' id='password' type="text" placeholder="put your password here"/>
            <label htmlFor="firstName">First Name</label>
            <input className='LoginInput' value={ this.state.firstName } onChange= { this.handleInputChange } name='firstName' id='firstName' type="text" placeholder="put your first name here"/>
            <label htmlFor="lastName">Last Name</label>
            <input className='LoginInput' value={ this.state.lastName } onChange= { this.handleInputChange } name='lastName' id='lastName' type="text" placeholder="put your last name here"/>
            <label htmlFor="age">Age</label>
            <input className='LoginInput' value={ this.state.age } onChange= { this.handleInputChange } name='age' id='age' type="text" placeholder="put your age here"/>
            <Button className='small-button' onClick = {this.createUser}>Create Account</Button>
            
 	        </form>
        <Link className = "signup-link" to = {"./"}>
          <Button className = "small-button back"> Go back </Button>
        </Link>
      </div>
    )
  }
}

export default Signup;
