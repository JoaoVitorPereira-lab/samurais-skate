import axios from "axios";
const api = axios.create({
    baseURL:'http://localhost:5000'
})

/* LISTAR TIPOS */
export async function ListarPedidosAdm(){
    const resposta = await api.get('/api/admin/pedidos');
    return resposta.data;
}