import axios from "axios";
const api = axios.create({
    baseURL:'http://localhost:5000'
})


export function CadastrarProduto (marca, categoria, tipo, nome, descricao, promocao, preco, avaliacao, estoque){
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

    return resposta.data
}