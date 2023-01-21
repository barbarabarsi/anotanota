import React, {useContext} from "react";
import "./styles.css"
import { AuthContext } from "../context/auth";

const Navbar = () => {
    
    const { logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout()
    }
    
    return(
        <div id="nav">
            <p className = "logo">Notas</p>
            <button onClick={ handleLogout }>Sair</button>
        </div>
    )
}

export default Navbar