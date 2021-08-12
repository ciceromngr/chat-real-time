import React, {useCallback, useEffect, useState} from 'react';
import { user } from '../../interfaces/interfaces';
import { getId } from '../../routes/auth';
import api from '../../server/api';
import './menuLateral.scss';

const MenuLateral = ({user, userSelected}: any) => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [infoUserLogado, setInfoUserLogado] = useState<user>();

    const handleInfo = async () => {
        const resp = await api.get(`/user/${getId()}`);
        setInfoUserLogado(resp.data)
    }

    const handleSearchUser = async (s: any) => {
        const resp = await api.get('/user');
        setSearch(s);
        setUsers(search ? resp.data.filter((item: any) => item.nome.indexOf(search) !== -1): []);
    }

    const handleAdd = async (item: any) => {
        const params1 = {
            "msg": [
                {
                    "conversaEntre": [user.nome, item.nome],
                    "chat": []
                }
            ],
            "amigos": [
                {
                    "id": item.id,
                    "nome": item.nome,
                    "img": item.img,
                }
            ],
        }

        const params2 = {
            "msg": [
                {
                    "conversaEntre": [item.nome, user.nome],
                    "chat": []
                }
            ],
            "amigos": [
                {
                    "id": user?.id,
                    "nome": user?.nome,
                    "img": user?.img,
                }
            ],
        }

        // const user2 = await api.get(`/user/${item.id}`)
        const user1 = await api.get(`/user/${user?.id}`)
        // Verificar se no usuario LOGADO tem o usuario que vai adcionar se nao tiver salva se tiver passa direto
        const result1 = user1.data.amigos.filter((e: any) => e.nome.indexOf(item.nome) !== -1);
        if(result1.length === 0 && user1.data.nome !== item.nome ) {
            console.log('esse amigo nao existe pode add', result1) 

        }else {
            console.log('nao pode add ', result1) 
        }
        // Verificar se no usuario 2 tem o usuario para nao aver mutiplos dados ;

        setSearch('')
        handleInfo();
    }

    const handleConversa = useCallback((e: any,item: any) => {
        e.preventDefault()
        userSelected(item);
    },[userSelected])

    useEffect(() => {
        handleInfo()
    },[])

    return (
        <div className="container__menuLateral">
            <div className="info-user">
                <div className="info-user__img">
                    <img src={user?.img} alt="" />
                </div>
                <div className="info-user__nome">
                    <p>{user?.nome}</p>
                </div>
            </div>

            <div className="pesquisa-user">
                <input type="search" value={search} onChange={(e) => handleSearchUser(e.target.value)} placeholder="Procurar Amigo Pelo Mundo"/>
            </div>

            <div className="search__container">
                {search ? users.map((item: any, key: any) => (
                    <div key={key} className="card__user" >
                        <h1>{item.nome}</h1>
                        <input type="button" value="Add" onClick={() => handleAdd(item)}/>
                    </div>
                )): infoUserLogado?.amigos.map((item: any, key: any)=> (
                    <div key={key} className="card__user" onClick={(e) => handleConversa(e,item)}>
                        <div className="card__user-img">
                            <img src={item.img} alt="" />
                        </div>
                        <div className="card__user-info">
                            <h1>{item.nome}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        )
}

export default MenuLateral;