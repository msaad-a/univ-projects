import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import WordVerifier from "./WordVerifier";
import '../../App.css';

class Game extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      possibleWords: props.config.words,
      rowIndex: 0,
      targetWord: '',
      gameState: 'inProgress',
      grid: [],
      gridWidth: props.config.gridWidth,
      gridHeight: props.config.gridHeight,
      wordVerifier: null,
      gridStyle: props.config.gridStyle,
      rowStyle: props.config.rowStyle,
      multiplayer: props.config.multiplayer
    }
    if (props.config.multiplayer){
        this.state.numPlayers = props.config.numPlayers
        this.state.currentTurn = 0;
        this.state.time = props.config.time
        this.state.rounds = props.config.rounds
        this.state.scores = []
        this.state.timer = this.state.time
    }
  }

  componentDidMount() { 
    this.mounted = true;

    this.wordVerifier = new WordVerifier()

    let g = []
    for (let i = 0; i < this.state.gridHeight; i++){
      let t = []
      for (let j = 0; j < this.state.gridWidth; j++){
        t.push({letter:"", color:"transparent"})
      }
      g.push(t)
    }
    this.setState({
      grid: g
    })

    let i = this.generateRandomIndex()
    this.setState({
      targetWord: this.state.possibleWords[i]
    })

    let scores = []
    for (let i = 0; i < this.state.numPlayers; i++){
      scores.push(0);
    }
    this.setState({
      scores: scores
    })
    this.startTimer()
  }

  componentdidUnmount(){
    this.mounted = false;
  }

  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  startTimer = async () => {
    if(!this.mounted){
      return;
    }
    if (this.state.timer === 0){
      this.setState({currentTurn: (this.state.currentTurn + 1) % this.state.numPlayers,
        timer: this.state.time})
      }
      else{
        this.setState({timer: this.state.timer - 1})
      }
    await this.sleep(1000)
    this.startTimer()
  }

  generateRandomIndex = () => {
    return Math.floor(Math.random()*this.state.possibleWords.length)
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      let guess = document.getElementsByClassName("inputGuess")[0];
      console.log(guess.value)
      if (guess.value.length === this.state.gridWidth) {
        if (this.state.multiplayer){
          this.setState({currentTurn: (this.state.currentTurn + 1) % this.state.numPlayers})
        }
        this.guessWord(guess.value)
      }
      guess.value = '';
    }
    console.log(this.state.targetWord)
  }

  guessWord = (word) => {
    // this would be a server call.
    if (!this.wordVerifier.isWord(word)){
      return;
    }

    if (this.state.gameState === 'inProgress') {
      let grid = [...this.state.grid];
      let targetWord = this.state.targetWord;
      let rowIndex = this.state.rowIndex;
      let updateRow = Array.from(Array(this.state.gridWidth).keys());
      var greenCount = {};
      var yellowCount = {};
      for(let i = 0; i < word.length; i++){
        let letter = word[i]
        if (targetWord[i] === letter) {
            updateRow[i] = ({letter: letter, color: "darkseagreen"});
            greenCount[letter] ??= 0;
            greenCount[letter]++;
        }
      }
      for(let i = 0; i < word.length; i++){
        let letter = word[i]
        greenCount[letter] ??= 0;
        yellowCount[letter] ??= 0;
        let count = (targetWord.split(letter).length - 1)
        if (targetWord.includes(letter) && (greenCount[letter] + yellowCount[letter] < count)) {
            updateRow[i] = ({letter: letter, color: "khaki"})
            yellowCount[letter]++;
        }
        else if (typeof updateRow[i] == "number"){
            updateRow[i] = ({letter: letter, color: "lightslategray"})
        }
      }

      grid[rowIndex] = updateRow;
      rowIndex = rowIndex + 1;
      let gameState = this.state.gameState;
      if (word === targetWord && gameState === 'inProgress') {
        gameState = 'win';
      }
      if (rowIndex >= this.state.gridHeight && gameState === 'inProgress') {
        gameState = 'lose'
      }
      
      this.setState({
        grid: grid,
        rowIndex: rowIndex,
        gameState: gameState
      })}
  }

  render() {
    let multiDisplay = <div> </div>
    if (this.state.multiplayer && this.state.gameState === "inProgress"){
      multiDisplay = <div className = "post-match"> 
      <h2 className = "match-result"> Player {this.state.currentTurn + 1}'s Turn, {this.state.timer} seconds remaining.</h2>
      </div>
    }
    return (
      <div className = "game-bg center">
        <div className = {this.state.gridStyle}>
              {this.state.grid.map((row,i)=>{
              return (
                <div className = {this.state.rowStyle} key = {i}>
                  {row.map((cell,i)=>{
                    if (cell.color === 'transparent') {
                      return(
                        <div key = {i} className = "tile unused">{cell.letter}</div>
                      )
                    }
                    else if (cell.color === 'darkseagreen') {
                      return(
                        <div key = {i} className = "tile right">{cell.letter}</div>
                      )
                    }
                    else if (cell.color === 'khaki') {
                      return(
                        <div key = {i} className = "tile close">{cell.letter}</div>
                      )
                    }
                    else {
                      return(
                        <div key = {i} className = "tile wrong">{cell.letter}</div>
                      )
                    }
                  })}  
              </div>)
              })}
        </div>
        <input type = "text" className = "inputGuess" maxLength = {this.state.gridWidth} onKeyPress = {this.handleKeyPress}></input>
        {(() => {
        if (this.state.gameState !== 'inProgress' && (!this.state.multiplayer)) {
          return (
          <div className = "post-match"> 
          <h2 className = "match-result"> You {this.state.gameState}</h2>
          <Link className = "play-again-link" to = {"./../SoloOptions"}>
            <Button> Play Again </Button>
          </Link>
          </div>
          )
        }
        if (this.state.gameState !== 'inProgress' && this.state.multiplayer) {
          let text = this.state.gameState==="lose" ? "Draw!" : "Player " + String(((this.state.currentTurn + this.state.numPlayers - 1) % this.state.numPlayers) + 1) + " Wins!" 
          return (
          <div className = "post-match"> 
          <h2 className = "match-result"> {text} </h2>
          <Link className = "play-again-link" to = {"./../LobbySettings"}>
            <Button> Play Again </Button>
          </Link>
          </div>
          )
        } 
        })()}
        <Link className = "menu-link" to = {"./"}>
          <Button className="menu-button"> Menu </Button>
        </Link>
        {multiDisplay}
      </div>
    );
  }
}

export default Game;
