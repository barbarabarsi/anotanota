import React from "react";
import "./styles.css"

const Navbar = () => {
    
    const handleLogout = () => {
        console.log("Logout")
    }
    
    return(
        <div id="nav">
            <p className = "logo">Notas</p>
            <button onClick={ handleLogout }>Sair</button>
        </div>
    )
}

export default Navbar