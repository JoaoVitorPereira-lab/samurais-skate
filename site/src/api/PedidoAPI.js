import { API_URL } from './config';

import axios from 'axios'
const api = axios.create({
    baseURL: API_URL
})


export async function SalvarNovoPedido(idUsuario, novoPedido) {
    const r = await api.post('/api/pedido/' + idUsuario, novoPedido);
    return r.data;
}