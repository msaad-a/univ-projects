import React from 'react';
import '../../App.css';
import Button from "@material-ui/core/Button";
import UsersList from "./UsersList";
import UsersForm from "./UsersForm";
import WordsList from "./WordsList";
import WordsForm from "./WordsForm";

class AdminHome extends React.Component {

  state = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    age: null,
    users: [],
    columns: [
      {  Header: 'Username',  accessor: 'username'  }, 
      {  Header: 'First Name',  accessor: 'firstName'  },
      {  Header: 'Last Name',  accessor: 'lastName'  },
      {  Header: 'Age',  accessor: 'age'  }
    ],
    /*word: "",
    length: 0,
    words: [
      { word: "Sharp", length: 5, status: "used" },
      { word: "Flank", length: 5, status: "new"}
    ],
    wordColumns: [
      {  Header: 'Word',  accessor: 'word'  }, 
      {  Header: 'Length',  accessor: 'length'  },
      {  Header: 'Status',  accessor: 'status'  }]  */

    

  }

  componentDidMount() {
    const url = '/api/users';
    const userList = [];
    
    fetch(url)
    .then(async res => { 
      if (res.status === 200) {

        return await res.json() 
      } else {
        alert('Could not get users')
      }                
    })
      .then((json) => {
        console.log(json)
        for (let i = 0; i < json.length; i++) { 
          userList.push(
              {username: json[i].username,
              firstName: json[i].firstName,
              lastName: json[i].lastName,
              age: json[i].age }
          )
          
          //console.log(users)
          //console.log(json[i]); 
        }
        this.setState({users: userList})
        }).catch((error) => {
            console.log(error)
        })
  }


  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value 
    });
  }

  addUser = () => {
    //add friend from search bar to list
    //TODO will have to do checking against available usernames
    //const usersTemp = this.state.users;
    //const user = { username: this.state.username, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, age: this.state.age };
    //usersTemp.push(user);
    //this.setState({users: usersTemp})

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
                alert('User has been added')
            } else {
                alert('Could not create account')
                console.log('Could not add user')
            }
        }).catch((error) => {
            console.log(error)
        })
     } else if (res.status === 200) {
        alert('This username is already in use')
     }                
    })
    const userList = this.state.users
    userList.push(
      {username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age }
    )

    this.setState({
      users: userList
    })
 }

  removeUser = (user) => {
    const url = `api/users/${user.username}`
    const request = new Request(url, {
      method: 'delete',
      headers: {
        'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
      },
    });
    fetch(request)
    .then(res => res.json())

    const filteredUsers = this.state.users.filter((s) => {
        return s !== user;
    })

    this.setState({
      users: filteredUsers
    })
  }
  
  addWord = () => {
    //add friend from search bar to list
    //TODO will have to do checking against available usernames
    const wordsTemp = this.state.words;
    const word = { word: this.state.word, length: this.state.length, status: 'new' };
    wordsTemp.push(word);
    this.setState({words: wordsTemp})

  }

  removeWord = (word) => {
    const filteredWords = this.state.words.filter((s) => {
        return s !== word;
    })

    this.setState({
      words: filteredWords
    })
  }

  handleClick = (event) => {
    event.preventDefault()
    this.props.islogin(false, false)
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      
      <div className='AdminHome center'>
        <h1>Admin Page</h1>
        <Button className='menu-button' id='logout' onClick={ this.handleClick }>Log Out</Button>
        {/* <input className='AdminHomeInput' id="username" type="text" name="username" onClick={ this.handleInputChange } placeholder="Username"></input>
        <input className='AdminHomeInput' id="password" type="text" name="password" onClick={ this.handleInputChange } placeholder="Password"></input>
        <Button className='other-button' id="Add User">Add User</Button> */}
      <div >
        <h2>Users List</h2>
        <UsersForm 
            name = { this.state.username }
            password = { this.state.password }
            firstName = { this.state.firstName }
            lastName = {this.state.lastName}
            age = {this.state.age}
            addUser = { this.addUser }
            handleInputChange = { this.handleInputChange }
            handleSubmit = { this.handleSubmit }
        />
        <div className="adminUserTableContainer">
          <UsersList 
            users = { this.state.users }
            columns = { this.state.columns }
            removeUser = { this.removeUser }
        />
        </div>
        

      </div>
      </div>
    )
  }
}

export default AdminHome;
