import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import '../../App.js';

import FriendList from "./FriendList";
import FriendForm from "./FriendForm";

class ProfilePage extends React.Component {

    state = {
        userName: this.props.currentUser,
        age: 0,
        totalGames: 0,
        numWins: 0,
        numLosses: 0,
        winStreak: 0,
        lastGameResult: '',
        lastGameNumGuesses: null,

        friendName: "",
        friendList: [
            {name: 'Mark',
            status: 'accepted'},
            {name: 'Anna',
            status: 'accepted'},
            {name: 'Bob',
            status: 'accepted'}
        ]
    }

    componentDidMount() {
        const url = `/api/users/${this.state.userName}`;
        
        const request = new Request(url, {
            method: 'get',
            headers: {
              'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
            },
          });
        fetch(request)
        .then(res => { 
          if (res.status === 200) {
            return res.json() 
          } else {
            console.log('could not get stats')
          }                
        })
          .then((json) => {
            console.log(json)
            let recentResult = ''
            if (json.recentResult === true) {
                recentResult = 'win'
            }
            else if (json.recentResult === false) {
                recentResult = 'loss'
            }
            this.setState({age: json.age,
                totalGames: json.totalGames,
                numWins: json.wins,
                numLosses: json.losses,
                winStreak: json.winStreak,
                lastGameResult: recentResult,
                lastGameNumGuesses: json.recentNumGuesses,
        })
            }).catch((error) => {
                console.log(error)
            })
      }

    handleInputChange = (event) => {
        //update value of friendName when user types into search form
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    addFriend = () => {
        //add friend from search bar to list
        //TODO will have to do checking against available usernames
        const friends = this.state.friendList;
        const friend = { name: this.state.friendName, status: 'pending' };
        friends.push(friend);
        this.setState({friendList: friends})

    }

    removeFriend = (friend) => {
        const filteredFriends = this.state.friendList.filter((s) => {
            return s !== friend;
        })

        this.setState({
            friendList: filteredFriends
        })
    }


    render() {
        return(
            <div className="ProfilePage">
                <h1>User Profile</h1>

                <div className="userInfo">
                    <h3>User Information:</h3>
                    <img src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"></img>
                    <p>username: <b>{ this.state.userName }</b> </p>
                    <p>age: <b>{ this.state.age }</b></p>
                </div>

                <div className="gameStats">
                        <h3>Game Statistics</h3>
                    <div className="left-col">
                        <p>Total games: <b>{ this.state.totalGames }</b></p>    
                        <p>Wins: <b>{ this.state.numWins }</b></p>
                    </div>
                    <div className="right-col">
                        <p>Losses: <b>{ this.state.numLosses }</b></p>
                        <p>Win streak: <b>{ this.state.winStreak }</b></p>
                    </div>
                </div>

                <div className="recentGame">
                    <h3>Recent Game</h3>
                    <p> Result: <b>{ this.state.lastGameResult }</b></p>
                    <p> Number of guesses: <b>{ this.state.lastGameNumGuesses }</b></p>
                </div>

                <div className="friendList">
                    <h3>Friend List</h3>
                    <FriendForm 
                        name = { this.state.friendName }
                        addFriend = { this.addFriend }
                        handleInputChange = { this.handleInputChange }
                    />
                    <FriendList 
                        friends = { this.state.friendList }
                        removeFriend = { this.removeFriend }
                    />

                </div>

                <Link className="menu-link" to={"./"}>
                    <Button className="menu-button">Menu</Button>
                </Link>

                <Button className='setting-button' id="setting">Setting</Button>
            </div>
        )
    }

}

export default ProfilePage;