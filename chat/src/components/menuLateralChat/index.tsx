import React, {useCallback, useEffect, useState} from 'react';
import { user } from '../../interfaces/interfaces';
import { getId } from '../../routes/auth';
import api from '../../server/api';
import './menuLateral.scss';

const MenuLateral = ({user, userSelected}: any) => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [amigos, setAmigos] = useState([]);
    const [infoUserLogado, setInfoUserLogado] = useState<user>();

    const handleInfo = async () => {
        const resp = await api.get(`/user/${getId()}`);
        setInfoUserLogado(resp.data)

        const respAmigos = await api.get(`/amigos`);
        setAmigos(respAmigos.data.filter((item: any) => item.userId === resp.data.amigos))
    }

    const handleSearchUser = async (search: any | undefined) => {
        const resp = await api.get('/user');
        setSearch(search);
        setUsers(search ? resp.data.filter((item: any) => item.nome.indexOf(search) !== -1): []);
    }

    const handleAdd = async (item: any) => {
        const params1_1 = {
            "msg": {
                "userId": user?.id,
                "conversaEntre":[user?.nome, item.nome],
                "chat": []
              },

            "amigos": {
                "userId": user?.id,
                "idAmigo": item.id,
                "nome": item.nome,
                "img": item.img
              }
        }

        const params1_2 = {
            "msg": {
                "userId": item.id,
                "conversaEntre":[item.nome,user.nome],
                "chat": []
              },

            "amigos": {
                "userId": item.id,
                "idAmigo": user?.id,
                "nome": user?.nome,
                "img": user?.img
              }
        }

        await api.post('/amigos',params1_1.amigos)
        await api.post('/amigos',params1_2.amigos)
        await api.post('/msg',params1_1.msg)
        await api.post('/msg',params1_2.msg)

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
                )): amigos.map((item: any, key: any)=> (
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