import React from "react";
import Navbar from "../Navbar/index.js";
import CreateNote from "../CreateNote/index.js";
import { useState, useEffect, useContext } from "react";
import { getNotas, deleteNota, createNota } from "../../services/api";
import { AuthContext } from "../../context/auth";
import img_edit from "./img_edit.png"
import img_delete from ".//img_delete.png"
import "./styles.css"

const Homepage = () => {

    const { usuario } = useContext(AuthContext)
    const [notas, setNotas] = useState([])
    const [query, setQuery] = useState("")
    const [busca, setBusca] = useState(false);
    const [style, setStyle] = useState("item")


    const loadNotas = async (query = '') => {
        console.log("aqui")
        const response = await getNotas(usuario?.id, query)
        setNotas(response.data)
    }
    
    useEffect(() =>{
        (async () => await loadNotas())()
    }, [])

    const handleDelete = async(idNota) => {
        setStyle("item-loading")
        await deleteNota(usuario.id, idNota)
        loadNotas()
        setStyle("item")
    }

    const handleEdit = () => {
        console.log("editado")
    }

    const handleSearch = async () => {
        setStyle("item-loading")
        loadNotas(query)
        const nav = document.getElementById('nav');
        if (nav) nav.scrollIntoView({ behavior: 'smooth' });
        setBusca(true)   
        setStyle("item")
    }

    const handleClear = async () => {
        setBusca(false)
        loadNotas()
    }

    const handleSend = async (titulo, texto) => {
        setStyle("item-loading")
        await createNota(usuario.id, titulo, texto)
        loadNotas()
        const nav = document.getElementById('nav');
        if (nav) nav.scrollIntoView({ behavior: 'smooth' });
        setStyle("item")
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
                        <span id="titulo">Notas encontradas</span>
                        <span id="limpar" onClick={ handleClear }>Limpar busca</span>
                    </div>
                    : <span id="titulo">Notas</span> }
                    <ul className="lista">
                        {
                        notas.length === 0 ? 
                        <span id="aviso">Você não tem nenhuma nota salva :(</span>
                        :(
                        notas.map((nota) =>
                        <li className={style} key={nota.ID}>
                            <div className="infos">
                                <span className="titulo">{ nota.Titulo }</span>
                                <div className="botoes">
                                    <button onClick={ handleEdit }>
                                        <img src={img_edit} alt="Editar"/>
                                    </button>
                                    <button onClick={ () => handleDelete(nota.ID) }>
                                        <img src={img_delete} alt="Deletar"/>
                                    </button>
                                </div>
                            </div>
                            <div className="content">{ nota.Texto }</div>
                           </li> )
                        )
                        }
                    </ul>
                </div>
            </div>
        </div>
        
    )
}

export default Homepage