import React from "react";
import "./styles.css"
import { getNotas, createNota } from "../services/api";
import { useState, useEffect } from "react";

const userID = 'd644172d-22a8-4786-83d7-83ceaa82f7a0'

const Create = ( { onSend } ) => {
    
    const [titulo, setTitulo] = useState('')
    const [texto, setTexto] = useState('')
    
    return(
        <div id="create">
            <span>Criar</span>
            <input 
                type="text-box" 
                name="titulo" 
                id="titulo" 
                placeholder="Título"
                value = { titulo }
                onChange = { (e) => setTitulo(e.target.value)}
            />
            <textarea 
                maxLength={280}
                className="text"
                name="texto" 
                id="texto" 
                placeholder="O que você deseja escrever?"
                value = { texto }
                onChange = { (e) => setTexto(e.target.value)}
            />
            <button onClick={ () => onSend(titulo, texto) }>Enviar</button>
        </div>
    )
}

export default Create