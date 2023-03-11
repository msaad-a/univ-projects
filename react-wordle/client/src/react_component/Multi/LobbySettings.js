import React from 'react';
import '../../App.css';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

class LobbySettings extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            wordlength: 0,
            rounds: 0,
            numGuess: 0,
            time_per_rn: 0,
            num_player: 0
        }
    }

    handleInputChange = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name
    
        this.setState({
          [name]: value
        })
        
      }

    render(){
        return (
        <div className = "options center">
            <div className = "settingsHeader center"> 
                <div className = "headerText"> Settings </div>
                </div>
            <div className = "options-bg center">
                <div className="optionContainer">
                    
                    <input className='optionInput' value={ this.state.wordlength } name= "wordlength"
                    onChange= { this.handleInputChange } type="text" placeholder="5"/>
                   
                    <span className="optionText">Word Length</span>
                </div>

                <div className="optionContainer">
                    <input className='optionInput' value={ this.state.rounds } name= "rounds"
                        onChange= { this.handleInputChange } type="text" placeholder="3"/>
                    <span className="optionText">Rounds</span>
                </div>

                <div className="optionContainer">
                    <input className='optionInput' value={ this.state.numGuess } name= "numGuess"
                        onChange= { this.handleInputChange } type="text" placeholder="6"/>
                    <span className="optionText">Number of Guesses</span>
                </div>
                
                <div className="optionContainer">
                    <input className='optionInput' value={ this.state.time_per_rn } name= "time_per_rn"
                        onChange= { this.handleInputChange } type="text" placeholder="30"/>
                    <span className="optionText">Time per Round</span>
                </div>

                <div className="optionContainer">
                    <input className='optionInput' value={ this.state.num_player } name= "num_player"
                        onChange= { this.handleInputChange } type="text" placeholder="2"/>
                    <span className="optionText">Number of Players</span>
                </div>
                <Link className = "menu-link" to  = {{pathname: "./multiGame", state: {wordLength: this.state.wordlength,
                                    rounds: this.state.rounds, numGuesses: this.state.numGuess, time: this.state.time_per_rn, numPlayers: this.state.num_player}}}>
                                    <Button className = "game-button create-button"> Create Game </Button> 
                                </Link>
                
            </div>
            
                <Link className = "menu-link" to = {"./"}></Link>
            
            <Link className = "menu-link" to = {"./"}>
              <Button className = "menu-button"> Menu </Button>
            </Link>
          </div>  
        )
    }

}
export default LobbySettings;
