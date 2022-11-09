import axios from "axios";
const api = axios.create({
    baseURL:'http://localhost:5000'
})

/* INFOS USUÁRIO */
export async function InfoUser(id){
    const resposta = await api.get('/api/info/usuario/' + id);
    return resposta.data;
}

/* LISTAR PEDIDOS */
export async function Listar(){
    const resposta = await api.get('/api/admin/pedidos');
    return resposta.data;
}

/* OLHAR DETALHES DO PEDIDO */
export async function Detalhes(id){
    const resposta = await api.get('/detalhe/pedido/' + id);
    return resposta.data;
}

/* REMOVER PRODUTO */
export async function Remover(id) {
    const r = await api.delete('/api/pedido/' + id);
    return r.data;
} 
export async function AlterarStatus(id){
    const r = await api.put(`{/api/produto/status/${id}`);
    return r.data
}