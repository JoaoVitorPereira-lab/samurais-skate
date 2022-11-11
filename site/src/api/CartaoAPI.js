import { API_URL } from "./config";
import axios from "axios";

const api = axios.create({
    baseURL: API_URL
})


export async function BuscarCartao(id){
    const resposta = await api.get('/api/cartao/' + id)
    return resposta.data
}


export async function CadastrarCartao(id, nome, numero, vencimento, cvv, tipo){
    const resposta = await api.post('/api/cartao', {
        id: id,
        nome: nome,
        numero: numero,
        vencimento:vencimento,
        cvv: cvv,
        tipo: tipo
    })

    return resposta.data;
}


export async function RemoverCartao(id) {
    const r = await api.delete('/api/remover/cartao/' + id);
    return r.data;
} 