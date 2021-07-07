import React from 'react';
import "./styled.scss";

export default ({onClick, active, data}: any) => {
    return (
        <div 
            onClick={onClick} 
            className={`chatlistItem ${active?'active': ''}`}
            
            >
            <img className="chatlistItem-avatar" src={data.avatar? data.avatar: "https://www.w3schools.com/howto/img_avatar2.png"} alt="" />
            <div className="chatlistItem-lines">
                <div className="chatlistItem-line">
                    <div className="chatlistItem-name">{data.title}</div>
                    <div className="chatlistItem-date">19:00</div>
                </div>
                <div className="chatlistItem-line">
                    <div className="chatlistItem-lastMsg">
                        <p>Opa tudo bem?</p>
                    </div>
                </div>
            </div>
        </div>
    )
}