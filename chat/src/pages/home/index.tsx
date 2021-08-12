import React, { useEffect, useState } from 'react';
import './home.scss';
import api from '../../server/api';
import { user } from '../../interfaces/interfaces';
import { getId } from '../../routes/auth';

import MenuLateral from '../../components/menuLateralChat';
import BodyChatConversation from '../../components/bodyChatConversation';

const Home = () => {
    const [infoUser, setInfoUser] = useState<user>();
    const [userSelectConversation, setUserSelectConversation] = useState();


    const handleData = async () => {
        const resp = await api.get(`/user/${getId()}`)
        setInfoUser(resp.data);
    }

    useEffect(() => {
        handleData();
    },[])
    
    return (
        <div className="container__home">
            <div className="home__chat">
                {/* menuLateral */}
                <MenuLateral user={infoUser} userSelected={setUserSelectConversation}/>
                {/* conversa chats */}
                <BodyChatConversation user={infoUser} userSelected={userSelectConversation}/>
            </div>
            {/* <div className="bola1"></div>
            <div className="bola2"></div> */}
        </div>
    );
}

export default Home;