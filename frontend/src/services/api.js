import axios from "axios"

export const api = axios.create({
    baseURL: 'http://localhost:5000',
})

export const createSession = async (email, password) => {
    return api.post
}

export const getNotas = async(usuarioId, query) => {
    let url = `/users/${usuarioId}/notas/`
    if (query !== undefined) url += `?q=${query}`
    return api.get(url)
}

export const deleteNota = async(usuarioId, idNota) => {

    let url = `/users/${usuarioId}/notas/${idNota}`
    return api.delete(url)

}

export const createNota = async(usuarioId, titulo, texto) => {
    console.log(titulo, texto)
    let url = `/users/${usuarioId}/notas/`
    return api.post(url, {'titulo': titulo, 'texto': texto})

}