import React, { useEffect, useState } from "react";
import "./styled.scss";

import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';

import logo from '../../assets/log.svg';
import register from '../../assets/register.svg';


import Social from "../../components/social";

export default () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [userName, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userSenha, setUserSenha] = useState('');
    const [userAvatar, setUserAvatar] = useState('');

    const handleLogin = async (e: any) => {
        e.preventDefault();
    }

    const handleCadastrar = async (e: any) => {
        e.preventDefault();
        
    }

    const handleNewLoginData = async (u: any) => {
        
        let newUser = {
                id: u.uid,
                name: u.displayName,
                avatar: u.photoURL,
                email: u.email,
                verificado: u.emailVerified
        }
        setUsername(newUser.name);
        setUserEmail(newUser.email);
        setUserAvatar(u.photoURL);
    }

    const handleLoginWithSocial = async (u: any) => {
        setEmail(u.email);
    }
    
    useEffect(() => {

        const container = document.querySelector(".lg-container");
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        
        sign_in_btn && sign_in_btn.addEventListener("click", () => {
                container && container.classList.remove("sign-up-mode")
        })

        sign_up_btn && sign_up_btn.addEventListener("click", () => {
            container && container.classList.add("sign-up-mode");
        
        })

    }, [])

    async function verificaLogin() {
       
    }

    useEffect(() => {
        verificaLogin();
    },[])

    return (
        <div className="lg-container">
            <div className="lg-forms-container">
                <div className="lg-cadastro">
                    <form onSubmit={(e)=>handleLogin(e)} className="lg-sign-in-form lg-form">

                    <h2 className="lg-title">Sign in</h2>
                    
                    <div className="lg-input-field">
                        <i><FaUser /></i>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                    </div>

                    <div className="lg-input-field">
                        <i><RiLockPasswordFill /></i>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            />
                    </div>

                    <input type="submit" value="Login" className="lg-btn" />
                    
                    <p className="lg-social-text">Ou entre pelas plataformas sociais</p>
                    <Social props={() => function(){} } sw={handleLoginWithSocial}/>

                </form>
                    <form className="lg-sign-up-form lg-form" onSubmit={(e) => handleCadastrar(e)}>

                    <h2 className="lg-title">Sign up</h2>

                    <div className="lg-input-field">
                        <i><FaUser/></i>
                        <input type="text" placeholder="Username" value={userName} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="lg-input-field">
                        <i><MdEmail/></i>
                        <input type="email" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                    </div>

                    <div className="lg-input-field">
                        <i><RiLockPasswordFill/></i>
                        <input type="password" placeholder="Password" value={userSenha} onChange={(e) => setUserSenha(e.target.value)} />
                    </div>

                    <input type="submit" className="lg-btn" value="Sign up" />
                    <p className="lg-social-text">Ou entre pelas plataformas sociais</p>
                    <Social props={handleNewLoginData} sw={() => function(){} }/>
                </form>
                </div>
                <div className="lg-panels-container">
                
                <div className="lg-panel lg-left-panel">
                        <div className="lg-content">
                            <h3>Novo Aqui ?</h3>
                                <p>
                                    Cadastre-se e venha conhecer o DevChat!
                                </p>
                            <button 
                            className="lg-btn transparent" id="sign-up-btn">
                                Sign up
                            </button>
                        </div>
                    <img src={logo} className="lg-image" alt="" />
                    </div>
                    
                    <div className="lg-panel lg-right-panel">
                        <div className="lg-content">
                            <h3>Um de nós ?</h3>
                                <p>
                                    Entre com sua conta !
                                </p>
                            <button
                            className="lg-btn transparent" id="sign-in-btn">
                                Sign in
                            </button>
                        </div>
                    <img src={register} className="lg-image" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}