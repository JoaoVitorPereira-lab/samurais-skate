import { API_URL } from "./config";
import axios from "axios";

const api = axios.create({
    baseURL: API_URL
})

export async function BuscarPorIDCarrinho (id){
    const resposta = await api.get(`/api/carrinho/produto/${id}`);
    return resposta.data
}