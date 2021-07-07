import React, {useState, useEffect} from "react";
import "./styled.scss";

import ChatListItem from '../../components/chatListItem';
import ChatIntro from '../../components/chatIntro';
import ChatWindow from '../../components/chatWindow';
import NewChat from '../../components/newChat';

import DonutLarge  from "@material-ui/icons/DonutLarge";
import Chat  from "@material-ui/icons/Chat";
import More  from "@material-ui/icons/MoreVert";
import Search  from "@material-ui/icons/Search";

export default () => {

    const [chatList, setChatlist] = useState([ 
        {chatId: 1, title: "fulano de tal1", image: "https://www.w3schools.com/howto/img_avatar2.png"}, 
        {chatId: 2, title: "fulano de tal2", image: "https://www.w3schools.com/howto/img_avatar2.png"}, 
        {chatId: 3, title: "fulano de tal3", image: "https://www.w3schools.com/howto/img_avatar2.png"}, 
        {chatId: 4, title: "fulano de tal4", image: "https://www.w3schools.com/howto/img_avatar2.png"} 
    ]);
    const [activeChat, setActiveChat] = useState<any|undefined>({});
    const [user, setUser] = useState({
        id:123,
        avatar: 'https://www.w3schools.com/howto/img_avatar2.png',
        name: 'Cicero Romao'
    });

    return (
        <div className="chat-window">
            <div className="sidebar">
            <NewChat />
                <header>
                    <img className="header-avatar" src={user.avatar} alt="avatar img" />
                    <div className="header-buttons">
                        <div className="header-btn">
                            <DonutLarge style={{color: "#919191"}}/>
                        </div>
                        <div className="header-btn">
                            <Chat style={{color: "#919191"}}/>
                        </div>
                        <div className="header-btn">
                            <More style={{color: "#919191"}}/>
                        </div>
                    </div>
                </header>

                <div className="search">
                    <div className="search-input">
                        <Search fontSize="small" style={{color: "#919191"}}/>
                        <input type="search" placeholder="Procurar uma comecar uma nova conversa" />
                    </div>
                </div>

                <div className="chatlist">
                    {chatList.map((item, key) => (
                        <ChatListItem 
                            key={key}
                            data={item}
                            active={activeChat.chatId === chatList[key].chatId}
                            onClick={() => setActiveChat(chatList[key])}
                        />
                    ))}
                </div>

            </div>
            <div className="contentarea">
                {activeChat.chatId !== undefined ? <ChatWindow user={user}/> : <ChatIntro />}
            </div>
        </div>
    )
}