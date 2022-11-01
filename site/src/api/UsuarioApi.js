import axios from "axios";
const api = axios.create({
    baseURL:'http://localhost:5000'
})

//Login Usuário
export  async function EntrarLogin(email,senha){
    const resposta = await api.post('/api/login', {
        email: email,
        senha: senha
    })
    return resposta.data
}

//Cadastrar Informações de Login
export async function CadastrarLogin (email, senha, id){
    const resposta = await api.post ('/api/cadastro',{
        email: email,
        senha: senha,
        conta: id
    })

    return resposta.data
}

//Cadastrar Informações Pessoais
export async function CadastrarConta (nome, sobrenome) {
    const resposta = await api.post ('/api/cadastro/informacoes', {
        nome: nome,
        sobrenome: sobrenome
    })

    return resposta.data
}

//Listar Produtos do Tenis
export async function ListarTenis(){
    const resposta = await api.get('/api/produtos/tenis')
    return resposta.data
}

//BUSCAR IMAGEM
export function buscarimagem(imagem){
    return `${api.getUri()}/${imagem}`
}

// BUSCAR TÊNIS POR NOME //
export async function BuscarTenisPorNome(nome){
    const resposta = await api.get(`/api/buscar/tenis?nome=${nome}`);
    return resposta.data;
}

// BUSCAR PRODUTO POR ID //
export async function BuscarProdutoPorID(id){
    const resposta = await api.get(`/produto/${id}/detalhe`);
    return resposta.data;
}

// BUSCAR AVALIAÇÃO
export async function buscarAvaliacao(id) {
    const resposta = await api.get(`/produto/${id}/avaliacao`);
    return resposta.data;
}

//Listar Produtos do Skate
export async function ListarSkate(){
    const resposta = await api.get('/api/produtos/skate')
    return resposta.data
}

//Listar Produtos do Boné
export async function ListarBone(){
    const resposta = await api.get('/api/produtos/bone')
    return resposta.data
}

//Listar Produtos do Acessório
export async function ListarAcessorios(){
    const resposta = await api.get('/api/produtos/acessorios')
    return resposta.data
}

//Listar Produtos em Promoção
export async function ListarPromocoes(){
    const resposta = await api.get('/api/produtos/promocoes')
    return resposta.data
}

//Buscar Nome Cartões
export async function BuscarCartao(id){
    const resposta = await api.get('/api/cartao/' + id + '/nome')
    return resposta.data
}

//Cadastrar Cartão

export async function CadastrarCartao(id,nome,numero, vencimento, cvv){
    const resposta = await api.post('/api/cartao' ,{
        id: id,
        nome: nome,
        numero: numero,
        vencimento:vencimento,
        cvv: cvv
    })

    return resposta.data;
}