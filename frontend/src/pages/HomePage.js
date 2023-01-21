import React from "react";
import Navbar from "./Navbar";
import Create from "./Create";
import { useState, useEffect } from "react";
import { getNotas, deleteNota, createNota } from "../services/api";

const userID = 'd644172d-22a8-4786-83d7-83ceaa82f7a0'

const HomePage = () => {

    const [notas, setNotas] = useState([])

    const loadNotas = async (query = '') => {
        const response = await getNotas(userID)
        setNotas(response.data)
    }
    
    useEffect(() =>{
        (async () => await loadNotas())()
    }, [])

    const handleSearch = (query) => {
        console.log("Input: ", query)
    }

    const handleDelete = async(idNota) => {
        await deleteNota(userID, idNota)
        loadNotas()
        console.log("Deletado")
    }

    const handleEdit = () => {
        console.log("Editado")
    }

    const handleSend = async (titulo, texto) => {
        console.log("estou aqui")
        await createNota(userID, titulo, texto)
        loadNotas()
        console.log("fiz tudo")
    }
    
    return(
        <div id="home">
            <Navbar></Navbar>
            <Create onSend = { handleSend }></Create>
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