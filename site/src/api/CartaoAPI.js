import { API_URL } from "./config";
import axios from "axios";

const api = axios.create({
    baseURL: API_URL
})


export async function BuscarCartao(id){
    const resposta = await api.get('/api/cartao/' + id + '/nome')
    return resposta.data
}


export async function CadastrarCartao(id,nome,numero, vencimento, cvv){
    const resposta = await api.post('/api/cartaoo' ,{
        id: id,
        nome: nome,
        numero: numero,
        vencimento:vencimento,
        cvv: cvv
    })

    return resposta.data;
}