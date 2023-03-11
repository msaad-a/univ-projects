import React from "react";
import '../../App.css';
import Game from ".";
import {useLocation} from 'react-router-dom';

export default function MultiGameCover()
{
    const location = useLocation()

    let config = {
        gridWidth: 5,
        gridHeight: 6,
        gridStyle: "game-grid center",
        rowStyle: "grid-row",
    }
    switch(location.state.wordLength){
        case '5':
            console.log('a')
            config.words = ['hello', 'mercy', 'adore', 'sound', 'point', 'heart', 'civil', 'there', 'chasm', 'zebra',
            'perky', 'river', 'ruins', 'sober', 'round', 'quack', 'quake', 'horse', 'itchy', 'given']
            break;
        case '6':
            config.words = ['bridge', 'apples', 'orange', 'garage', 'manure', 'stitch', 'shovel', 'gravel', 'clover', 'silver',
            'sludge', 'crutch', 'tavern', 'thorny', 'yearns', 'wonder', 'actual', 'proven', 'amount', 'invert']
            break;
        case '7':
            config.words = ['thought', 'between', 'without', 'picture', 'country', 'example', 'because', 'science', 'shocked', 'abysmal',
            'serious', 'circles', 'neutral', 'natural', 'pigment', 'proudly', 'protect', 'majesty', 'exclude', 'further']
            break;
        default:
            config.words = ['thought', 'between', 'without', 'picture', 'country', 'example', 'because', 'science', 'shocked', 'abysmal',
            'serious', 'circles', 'neutral', 'natural', 'pigment', 'proudly', 'protect', 'majesty', 'exclude', 'further']
            break;
    }

    config.gridWidth = parseInt(location.state.wordLength)
    config.rounds = parseInt(location.state.rounds)
    config.gridHeight = parseInt(location.state.numGuesses)
    config.time = parseInt(location.state.time)
    config.numPlayers = parseInt(location.state.numPlayers)
    config.multiplayer = true
    console.log(config)
    return <div>
        <Game config = {config}/>
        </div>
}