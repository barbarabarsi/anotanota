import React from "react";


const Login = () => {
    return (
        <div id="login">
            <h1 className="title">Login</h1>
            <form>
                <div className="field">
                    <p>Email</p>
                    <input type="email" name="email" id="email"/>
                </div>
                <div className="field">
                    <p>Senha</p>
                    <input type="password" name="password" id="password"/>
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}

export default Login