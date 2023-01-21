import React from "react";
import Navbar from "./Navbar";
import CreateNote from "./CreateNote";
import { useState, useEffect, useContext } from "react";
import { getNotas, deleteNota, createNota } from "../services/api";
import { AuthContext } from "../context/auth";


const HomePage = () => {

    const { usuario } = useContext(AuthContext)
    const [notas, setNotas] = useState([])

    const loadNotas = async (query = '') => {
        const response = await getNotas(usuario.id)
        setNotas(response.data)
        console.log(usuario)
    }
    
    useEffect(() =>{
        (async () => await loadNotas())()
    }, [])

    const handleDelete = async(idNota) => {
        await deleteNota(usuario.id, idNota)
        loadNotas()
    }

    const handleEdit = () => {
        console.log("Editado")
    }

    const handleSend = async (titulo, texto) => {
        await createNota(usuario.id, titulo, texto)
        loadNotas()
    }
    
    return(
        <div id="home">
            <Navbar></Navbar>
            <CreateNote onSend = { handleSend }></CreateNote>
            {/* <div className = "search">
                <p>Buscar:</p>
                <input 
                    type="search" 
                    name="query" 
                    id="query" 
                    // value = { senha }
                    // onChange = { (e) => setSenha(e.target.value)}
                    />
                <button onClick={ handleSearch }>Buscar</button>
            </div> */}
            <div className="notas">
                <p>Notas</p>
                <ul className="lista">
                    {
                    notas.map((nota) =>
                        <li className="item" key={nota.ID}>
                            <div className="infos">
                                <span className="titulo">{ nota.Titulo }</span>
                                <div className="botoes">
                                    <button onClick={ () => handleDelete(nota.ID) }>Deletar</button>
                                    <button onClick={ handleEdit }>Editar</button>
                                </div>
                            </div>
                            <div className="content">{ nota.Texto }</div>
                        </li> 
                    )
                    }
                </ul>
            </div>
        </div>
        
    )
}

export default HomePage