import './login.scss';
import React, {useState} from 'react';
import {setToken, setId} from '../../routes/auth';
import { useHistory } from 'react-router-dom';
import api from '../../server/api';
const Login = () => {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async (e: any) => {
        e.preventDefault();

        try {
            const resp = await api.get('/user');
            const user: any = resp.data.filter((user: any) => user.email.indexOf(email) !== -1);
            if(user) {
                await api.patch(`/user/${user[0].id}`, {
                    "token": gerneratorToken()
                })
            }

            setToken(user[0].token);
            setId(user[0].id)

            history.push('/home')
            
        } catch (error) {
            console.log("Error")
        }
    }

    function gerneratorToken() {
        var result: String = '';
        for (var i = 80; i > 0; --i) result += (Math.floor(Math.random()*256)).toString(16);
        return result;
    }
    return (
        <main>
            <div className="container__login">
                <form onSubmit={(e) => handleLogin(e)} className="login__form">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                    <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" />
                    <input type="submit" value="Entrar" />
                </form>
                    <div className="bola1"></div>
                    <div className="bola2"></div>
            </div>
        </main>
    )
}

export default Login;