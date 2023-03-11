import React from 'react';
import '../../App.css';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
class RegularHome extends React.Component {

  handleClick = (event) => {
    event.preventDefault()
    this.props.islogin(false, false)

    
  }

  render() {
    return (
      <div className='RegularHome center'>
        <h1>regular Page</h1>
        <Button className='logout-button' id='logout' onClick={ this.handleClick }>Log Out</Button>
        <div className='options-bg center'>
          <Link className = "op1-link" to = {"./SoloOptions"}>
            <Button className='game-button' id='playsolo'>Play Solo</Button>
          </Link>
          
          <Link className = "op3-link" to = {"./multi"}>
            <Button className='game-button' id="playmul">Play Multiplayer</Button>
          </Link>
        </div>
          <Link to={ "/profile" }>
            <Button className='profile-button' id="profile">Profile</Button>
          </Link>
        
        <Button className='setting-button' id="setting">Setting</Button>


      </div>
    )
  }
}

export default RegularHome;
