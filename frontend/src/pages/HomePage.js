import React from "react";
import Navbar from "./Navbar";
import CreateNote from "./CreateNote";
import { useState, useEffect, useContext } from "react";
import { getNotas, deleteNota, createNota } from "../services/api";
import { AuthContext } from "../context/auth";
import img_edit from "../images/img_edit.png"
import img_delete from "../images/img_delete.png"


const HomePage = () => {

    const { usuario } = useContext(AuthContext)
    const [notas, setNotas] = useState([])
    const [query, setQuery] = useState("")
    const [busca, setBusca] = useState(false);


    const loadNotas = async (query = '') => {
        const response = await getNotas(usuario?.id, query)
        setNotas(response.data)
        console.log(response.data)
    }
    
    useEffect(() =>{
        (async () => await loadNotas())()
    }, [])

    const handleDelete = async(idNota) => {
        await deleteNota(usuario.id, idNota)
        loadNotas()
    }

    const handleEdit = () => {
        console.log("editado")
    }

    const handleSearch = async () => {
        loadNotas(query)
        const nav = document.getElementById('nav');
        if (nav) nav.scrollIntoView({ behavior: 'smooth' });
        setBusca(true)
        // Resultado da busca por: "" Limpar busca
    
    }

    const handleClear = async () => {
        setBusca(false)
        loadNotas()
    }


    const handleSend = async (titulo, texto) => {
        await createNota(usuario.id, titulo, texto)
        loadNotas()
        const nav = document.getElementById('nav');
        if (nav) nav.scrollIntoView({ behavior: 'smooth' });
    }
    
    return(
        <div id="home">
            <Navbar id="nav"></Navbar>
            <div className="main">
                <div className="tools">
                <div className = "search">
                    <span>Buscar:</span>
                    <input 
                        type="search" 
                        name="query" 
                        id="query" 
                        value = { query }
                        onChange = { (e) => setQuery(e.target.value)}
                        placeholder= "Digite o título da nota desejada"
                        />
                    <button onClick={ handleSearch }>Buscar</button>
                    </div>
                    <CreateNote onSend = { handleSend }></CreateNote>
                    
                </div>
                <div className="notas">
                    { busca ? 
                    <div className="result-busca">
                        <span>Notas encontradas</span>
                        <span id="limpar" onClick={ handleClear }>Limpar busca</span>
                    </div>
                    : <span>Notas</span> }
                    <ul className="lista">
                        {
                        notas.map((nota) =>
                            <li className="item" key={nota.ID}>
                                <div className="infos">
                                    <span className="titulo">{ nota.Titulo }</span>
                                    <div className="botoes">
                                        <button onClick={ handleEdit }><img src={img_edit} /></button>
                                        <button onClick={ () => handleDelete(nota.ID) }><img src={img_delete} /></button>
                                    </div>
                                </div>
                                <div className="content">{ nota.Texto }</div>
                            </li> 
                        )
                        }
                    </ul>
                </div>
            </div>
        </div>
        
    )
}

export default HomePage