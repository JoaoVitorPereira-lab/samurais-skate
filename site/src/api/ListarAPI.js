import axios from "axios";
const api = axios.create({
    baseURL:'http://localhost:5000'
})

/* LISTAR TIPOS */
export async function ListarTipos(){
    const resposta = await api.get('/api/tipo');
    return resposta.data
}


/* LISTAR MARCAS */
export async function ListarMarcas(){
    const resposta = await api.get('/api/marca')
    return resposta.data
}

/* LISTAR MARCAS Skate */
export async function ListarMarcaskate(){
    const resposta = await api.get('/api/marca/skate')
    return resposta.data
}

/* LISTAR TIPOS DE SKATE */
export async function ListarTiposSkate(){
    const resposta = await api.get('/api/tipo/skate')
    return resposta.data
}