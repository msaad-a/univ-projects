import React from "react";
import '../../App.css';
import Game from ".";
import {useLocation} from 'react-router-dom';

export default function SoloGameCover()
{
    const location = useLocation()
    let config1 = {
        words: ['hello', 'mercy', 'adore', 'sound', 'point', 'heart', 'civil', 'there', 'chasm', 'zebra',
                'perky', 'river', 'ruins', 'sober', 'round', 'quack', 'quake', 'horse', 'itchy', 'given'],
        gridWidth: 5,
        gridHeight: 6,
        gridStyle: "game-grid center",
        rowStyle: "grid-row",
        
    }

    let config2 = {
        words: ['bridge', 'apples', 'orange', 'garage', 'manure', 'stitch', 'shovel', 'gravel', 'clover', 'silver',
        'sludge', 'crutch', 'tavern', 'thorny', 'yearns', 'wonder', 'actual', 'proven', 'amount', 'invert'],
        gridWidth: 6,
        gridHeight: 6,
        gridStyle: "game-grid2 center",
        rowStyle: "grid-row2",
    }

    let config3 = {
        words: ['thought', 'between', 'without', 'picture', 'country', 'example', 'because', 'science', 'shocked', 'abysmal',
        'serious', 'circles', 'neutral', 'natural', 'pigment', 'proudly', 'protect', 'majesty', 'exclude', 'further'],
        gridWidth: 7,
        gridHeight: 6,
        gridStyle: "game-grid3 center",
        rowStyle: "grid-row3",
    }
    let config = null
    // console.log(location.state.configNum)
    switch(location.state.configNum){
        case 1:
            config = config1
            break;
        case 2:
            config = config2
            break;
        case 3:
            config = config3
            break;
        default:
            config = config1
    }

    config.multiplayer = false

    return <div>
        <Game config = {config}/>
        </div>
}
