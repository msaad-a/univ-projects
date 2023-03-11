import React from 'react';
import '../../App.css';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

class Lobby extends React.Component{
    render(){
        return (
            <div className='background center'>
                <div className='chatbox'>
                    <div className='chatContainer'>
                        <span className='chatName'>Steven: </span>
                        <span className='chatText'>sample chat</span>
                    </div>
                    <div className='chatContainer'>
                        <span className='chatName'>Steven: </span>
                        <span className='chatText'>sample chat2</span>
                    </div>
                </div>
                <Link className = "menu-link" to = {"./"}>
                    <Button className = "menu-button"> Menu </Button>
                </Link>
            </div>
          )
    }

}
export default Lobby;
