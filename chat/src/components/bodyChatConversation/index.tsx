import React, {useCallback, useEffect, useState} from 'react';
import './body.scss';
import api from '../../server/api';
import { getId } from '../../routes/auth';

const BodyConversation = ({user , userSelected}: any) => {
    const [msg, setMsg] = useState('');
    const [chat, setChat] = useState([]);
    const [chatConversation, setChatConversation] = useState([])

    const handleChat =async () => {
        const resp = await api.get(`/user/${getId()}`)
        setChat(resp.data.msg);
    }

    const handleEnviarMensagem = async (e: any) => {
        e.preventDefault();

            chat.map((item:any) => {
                    const res = item.conversaEntre;
                    if(res[0] === user?.nome && res[1] === userSelected?.nome ) {
                        console.log("conversa com ", userSelected?.nome);;
                        console.log("Item ", item);

                        const parms = {
                            "msg": [
                                {
                                  "chat": [
                                      {"nome":user?.nome, "msg": msg}
                                    ]
                                }
                              ]
                        } 
                        // console.log(parms)
                        setChatConversation(item.chat);
                    }
                }
            )
            
            // await api.patch(``);

        setMsg('');
    }

    useEffect(() => {
        handleChat();
    },[])
    
    return (
        <>
        {userSelected?
            (
                <div className="container__bodyConversation">
                    <div className="bodyConversation__header">
                        <img src={userSelected?.img} alt="" />
                        <h1>{userSelected?.nome}</h1>
                    </div>

                    <div className="bodyConversation__body">
                        {/* {chat.map((item:any, key: any) => (
                            <div key={key}>
                                <div className="user1"><h1>Ola user 1</h1></div>
                                <div className="user2"><h1>Ola user 2</h1></div>
                            </div>
                        ))} */}
                    </div>

                    <div className="bodyConversation__input">
                        <form onSubmit={(e) => handleEnviarMensagem(e)}>
                            <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)}/>
                            <input type="submit" value="Enviar" />
                        </form>
                    </div>
                </div>
        )
            :
            (<h1>Selecione um Amigo Para Conversar</h1>)
        }
        </>
        
    )
}

export default BodyConversation;