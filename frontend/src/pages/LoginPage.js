import React, { useState } from "react";
import Navbar from "./Navbar";
import "./styles.css"

const LoginPage = () => {
    
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const handleLogin = () => {
        console.log("email: ", email)
        console.log("senha: ", senha)
        console.log("Login")
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
                <button onClick={ handleLogin }>Entrar</button>
            </form>
        </div>
    )
}

export default LoginPage