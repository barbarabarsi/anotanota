import React, { useState, useContext } from "react";
import Navbar from "./Navbar";
import { createSession } from "../services/api";
import "./styles.css"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../context/auth";

const LoginPage = () => {
    
    const navigate = useNavigate();
    const { login } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const handleLogin = async() => {
        console.log("Login")
        const response = await createSession(email, senha)
        await login(email,senha)
        navigate("/")
    }

    return(
        <div id="login">
            <div className="title">Login</div>
            <form>      
                <div className="field">
                    <p>Email:</p>
                    <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value = { email }
                    onChange = { (e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="field">
                    <p>Senha:</p>
                    <input 
                    type="password" 
                    name="senha" 
                    id="senha" 
                    value = { senha }
                    onChange = { (e) => setSenha(e.target.value)}
                    />
                </div>
                <button type="button" onClick={ handleLogin }>Entrar</button>
            </form>
        </div>
    )
}

export default LoginPage