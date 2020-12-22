import React from 'react'
import mainicon from 'assets/mainicon.jpg'
import 'App.css';

export function Main (props) {
    const {} = props;

    return (
        <div className="mainStyle">
            <img style={{width:"200px", height:"200px"}} src={mainicon}></img>
        </div>
    );
}