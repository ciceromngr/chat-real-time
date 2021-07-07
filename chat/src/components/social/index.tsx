import React from 'react';
import "./styled.scss";
import { FaFacebookF, FaGithub, FaGoogle, FaLinkedinIn } from 'react-icons/fa';
export default ({props, sw}: any) => {
    const handlefacebook = async () => {
       
    }

    const handleGoogle = async () => {
        
    }

    return (
        <div className="social-media">
        <a onClick={() => handlefacebook()} className="social-icon">
            <i><FaFacebookF/></i>
        </a>
        <a className="social-icon">
            <i><FaGithub/></i>
        </a>
        <a onClick={() => handleGoogle()} className="social-icon">
            <i><FaGoogle/></i>
        </a>
        <a className="social-icon">
            <i><FaLinkedinIn/></i>
        </a>
    </div>
    )
}