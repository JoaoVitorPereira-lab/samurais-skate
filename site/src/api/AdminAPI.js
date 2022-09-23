import axios from "axios";
const api = axios.create({
    baseURL:'http://localhost:5000'
})


export async function EndPointCadastrarProduto (marca, categoria, tipo, nome, descricao, promocao, preco, avaliacao, estoque){
    const resposta = await api.post('/api/admin/produto', {
        marca: marca, 
        categoria: categoria,
        tipo: tipo,
        nome: nome,
        descricao: descricao,
        promocao: promocao,
        preco: preco,
        avaliacao: avaliacao,
        estoque: estoque,
    })

    return resposta.data;
}

export async function alterarProduto(id, marca, categoria, tipo, nome, descricao, promocao, preco, avaliacao, estoque){

    const resposta = await api.put(`api/admin/${id}`, {
        marca: marca, 
        categoria: categoria,
        tipo: tipo,
        nome: nome,
        descricao: descricao,
        promocao: promocao,
        preco: preco,
        avaliacao: avaliacao,
        estoque: estoque,
    })
    return resposta.data;

}


export async function ListarCategoria(){
    const resposta = await api.get('/api/categoria');
    return resposta.data;
}

export async function ListarTipos(){
    const resposta = await api.get('/api/tipo');
    return resposta.data
}

export async function ListarMarcas(){
    const resposta = await api.get('/api/marca')
    return resposta.data
}

export async function BuscarImagem(imagem){
    return `${api.getUri()}/${imagem}`
}


export async function enviarimagem (id, imagem){
    const formData = new FormData();
    formData.append('imgproduto', imagem);
    
    const resposta = await api.post(`/api/admin/${id}/imagem` , formData, {
        headers:{
            "Content-Type": "multipart/form-data"
        },
    });
    return resposta.status;
}