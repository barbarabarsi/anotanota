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
            <span className = "logo">Notas</span>
            <div className="links">
                <span onClick={ handleLogout }>Sair</span>
            </div>
            
        </div>
    )
}

export default Navbar