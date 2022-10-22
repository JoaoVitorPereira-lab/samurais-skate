import { API_URL } from "./config";
import axios from "axios";

const api = axios.create({
    baseURL: API_URL
})

export async function Listar(idUsuario){
    const r = await api.get('/api/usuario/' + idUsuario + '/endereco');
    return r.data;
}

export async function Salvar(idUsuario, referencia, cep, rua, numero, complemento, bairro, cidade, estado){
    const r = await api.post('/api/usuario/' + idUsuario + '/endereco', { referencia, cep, rua, numero, complemento, bairro, cidade, estado });
    return r.data;
}