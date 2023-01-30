import React, { createContext } from "react"
import { api, createSession } from "../services/api"
import { useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    
    const [usuario, setUsuario] = useState(() => JSON.parse(localStorage.getItem("usuario")) ?? null)
    const [token, setToken] = useState(() => JSON.parse(localStorage.getItem("token")) ?? null)


    useEffect(() => {
        api.defaults.headers.Authorization = `Bearer ${token}`
    },[])
    
    const login = async(email, senha) => {
        
        const response = await createSession(email, senha)
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario))
        localStorage.setItem('token', JSON.stringify(response.data.token))
        setUsuario(response.data.usuario)
        api.defaults.headers.Authorization = `Bearer ${response.data.token}`
    }

    const logout = () => {
        localStorage.removeItem('usuario')
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = null
        setUsuario(null)
    }

    return (
        <AuthContext.Provider
            value={{
                authorized: Boolean(usuario),
                usuario,
                login,
                logout
            }}>
            {children}
        </AuthContext.Provider>
    )

}