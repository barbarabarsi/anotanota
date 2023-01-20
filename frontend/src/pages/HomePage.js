import React from "react";
import Navbar from "./Navbar";

const HomePage = () => {
    
    
    const handleSearch = (query) => {
        console.log("Input: ", query)
    }

    const handleDelete = () => {
        console.log("Deletado")
    }

    const handleEdit = () => {
        console.log("Editado")
    }
    
    return(
        <div id="home">
            <Navbar />
            <div className = "search">
                <p>Buscar:</p>
                <input 
                    type="search" 
                    name="query" 
                    id="query" 
                    // value = { senha }
                    // onChange = { (e) => setSenha(e.target.value)}
                    />
                <button onClick={ handleSearch }>Buscar</button>
            </div>
            <div className="notas">
                <p>Notas</p>
                <ul className="lista">
                    <li className="item">
                        <div className="infos">
                            <span className="titulo">Titulo da nota</span>
                            <div className="botoes">
                                <button onClick={ handleDelete }>Deletar</button>
                                <button onClick={ handleEdit }>Editar</button>
                            </div>
                        </div>
                        <div className="content">Lorem ipsum sit dolorem at met</div>
                    </li>
                </ul>
            </div>
        </div>
        
    )
}

export default HomePage