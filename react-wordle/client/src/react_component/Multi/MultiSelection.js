import React from 'react';
import '../../App.css';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

class MultiSelection extends React.Component{
    state = {
      
    }
    render(){
        return (
          <div className = "options center">
            <div className = "options-bg center"></div>
            <Link className = "center" to = {"./../lobbySettings"}>
              <Button className = "game-button">Create Game</Button>
            </Link>
            {/* <Link className = "op2-link center" to = {"./../lobby"}>
              <Button className = "solo-button">Join Lobby</Button>
            </Link> */}
            <Link className = "menu-link" to = {"./"}>
              <Button className = "menu-button"> Menu </Button>
            </Link>
          </div>  
        )
    }

}
export default MultiSelection;
