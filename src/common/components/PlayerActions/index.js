import React from 'react'
import 'App.css'

export function PlayerActions (props) {
    const {handleOnClickHit, handleOnClickKeep, handleOnClickDouble} = props   
    
    return (
        <div className="actionsStyle">
            <button className="buttonStyle" type="button" onClick={e=>handleOnClickHit(e)} value="Hit" >Hit</button>
            <button className="buttonStyle" type="button" onClick={e=>handleOnClickKeep(e)} value="Keep" >Keep</button>
            <button className="buttonStyle" type="button" onClick={e=>handleOnClickDouble(e)} value="Double" >Double</button>
        </div>
    );
}