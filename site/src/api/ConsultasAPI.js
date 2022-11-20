import axios from "axios";
const api = axios.create({
    baseURL:'http://localhost:5000'
})

//Listar Produtos do Skate
export async function ListarSkate(){
    const resposta = await api.get('/api/produtos/skate')
    return resposta.data
}

//Listar Produtos do Boné
export async function ListarBone(){
    const resposta = await api.get('/api/produtos/bone')
    return resposta.data
}

//Listar Produtos do Acessório
export async function ListarAcessorios(){
    const resposta = await api.get('/api/produtos/acessorios')
    return resposta.data
}

//Listar Produtos em Promoção
export async function ListarPromocoes(){
    const resposta = await api.get('/api/produtos/promocoes')
    return resposta.data
}

//Listar Produtos em Promoção
export async function ListarTamanhos(){
    const resposta = await api.get('/api/tamanho/tenis')
    return resposta.data
}