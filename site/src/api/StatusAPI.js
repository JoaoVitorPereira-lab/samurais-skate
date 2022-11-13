import { API_URL } from "./config";
import axios from "axios";

const api = axios.create({
    baseURL: API_URL
})


export async function AlterarStatus(id, status){
    const resposta = await api.put(`/api/pedido/status/${id}`, {
        status: status
    })
    return resposta.data
}