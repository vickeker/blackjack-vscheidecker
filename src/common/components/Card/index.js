import React from 'react'
import 'App.css';
import { cardImages } from 'assets/cards'

export function Card (props) {
    const {img} = props.card
    var img_name = img.replace(' ', '_').replace('(','').replace(')','').replace('.jpg','')

    return (
        <img className="cardStyle" src={cardImages[img_name]} alt={img}></img>
    );

}