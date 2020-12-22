import React from 'react'
import 'App.css'

export function Banner (props) {
    const {backgroundColor, text} = props;

    var bannerStyle = {
        backgroundColor: backgroundColor ? backgroundColor : '#C3FFD5',
    }
    return (
        <div className="banner" style={bannerStyle}>{text}</div>
    );
}