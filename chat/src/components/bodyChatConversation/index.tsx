import React, {useCallback, useEffect, useState} from 'react';
import './body.scss';
import api from '../../server/api';
import { getId } from '../../routes/auth';

const BodyConversation = ({user , userSelected}: any) => {
    const [msg, setMsg] = useState('');
    const [chat, setChat] = useState([]);
    const [chatConversation, setChatConversation] = useState([])
    // setTimeout(() => {
    //     handleChat()
    // },10000)
    const handleChat =async () => {
        const chatMensage = await api.get('/chat');

        chatMensage.data.map(async (item: any) => {
            const arrayCE = item.conversaEntre
            console.log(item)
            
            if(arrayCE[0] === user?.nome && arrayCE[1] === userSelected?.nome){
                setChat(item.msg);
            }
        })
    }

    const handleEnviarMensagem = async (e: any) => {
        e.preventDefault();

        const params = {
            "nome": user.nome,
            "cv": msg
        }

        await api.patch('/chat/1', {
            "msg": [...chat, params]
        });

        
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
                        {chat.map((item:any, key: any) => (
                            <div key={key}>
                                <div className={item.nome === user?.nome?'user1': 'user2'}><h1>{item.cv}</h1></div>
                            </div>
                        ))}
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