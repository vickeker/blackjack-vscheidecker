import React from 'react'
import 'App.css';
import {Card} from 'common/components'

const getLabel = (isPlaying, win, name, wallet) => {
    var  status = ''
    if (isPlaying) {
        status = '(playing)'
    } else if (win > 0) {
        status = '(WIN)'
    } else if (win < 0) {
        status = '(LOST)'
    }
    return name + status + ': $' + wallet
}

export function Player (props) {
    const { player, isPlaying } = props
    const {name, cards, wallet, win} = player
    var label = getLabel(isPlaying, win, name, wallet)
    console.log(label)
    return (
        <div className="playerStyle">
            <label>{label}</label>
            <div className="handStyle">
                {cards && cards.length>0 && cards.map(card => {
                    return <Card card={card}/>
                })}
            </div>
        </div>
    );

}