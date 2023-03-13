import axios from "axios"

export const api = axios.create({
    baseURL: 'https://log-syst-32qjvhb0i-barbarabarsi.vercel.app',
})

let token = null 

api.interceptors.request.use(async config => {
    if (!token) {
      token = JSON.parse(localStorage.getItem("token"))
    }
    config.headers.Authorization = `Bearer ${token}`
    return config
})


export const createSession = async (email, senha) => {
    return api.post('/session', {email, senha})
}

export const createUser = async (nome, email, senha) => {
    return api.post('/users', {nome, email, senha})
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
    let url = `/users/${usuarioId}/notas/`
    return api.post(url, {'titulo': titulo, 'texto': texto})

}