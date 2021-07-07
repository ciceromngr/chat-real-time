import React from 'react';
import "./styled.scss";

export default ({data, user} : any) => {
    return (
        <div 
            className="messageLine"
            style={{justifyContent: user.id === data.author? "flex-end": "flex-start"}}
        >
            <div 
                className="messageItem"
                style={{backgroundColor: user.id === data.author ? "#dcf8c6": "#fff"}}
            >
                <div className="messageText">{data.body}</div>
                <div className="messageDate">19:00</div>
            </div>
        </div>
    )
}