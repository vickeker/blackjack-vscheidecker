import React from 'react'
import 'App.css';
import {Card} from 'common/components'


export function Dealer (props) {
    const {cards} = props
    return (
        <div className="dealerStyle">
            <label>Dealer</label>
            <div className="handStyle">
                {cards && cards.length>0 && cards.map(card => {
                    return <Card card={card}/>
                })}
            </div>
        </div>
    );

}