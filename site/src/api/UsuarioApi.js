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

//Listar Tudo
export async function ListarTudo(){
    const resposta = await api.get('/api/produtos')
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
export async function BuscarProdutoPorNome(nome){
    const resposta = await api.get(`/api/buscar/produtos?nome=${nome}`);
    return resposta.data;
}

// BUSCAR PRODUTO POR ID //
export async function BuscarProdutoPorID(id){
    const resposta = await api.get(`/produto/${id}/detalhe`);
    return resposta.data;
}

//Atualizar Infos Conta
export async function AtualizarConta(id,nome,sobrenome){
    const resposta = await api.put (`/api/usuario/conta/${id}`,{
        nome:nome,
        sobrenome:sobrenome
    })
    return resposta.data
}

//Atualizar Infos Login
export async function AtualizarLogin(id,email,senha){
    const resposta = await api.put (`/api/usuario/login/${id}`,{
        email:email,
        senha:senha
    })
    return resposta.data
}

/* OLHAR DETALHES DO PEDIDO USUÁRIO*/
export async function DetalhesPedido(idPedido, idUsuario){
    const resposta = await api.get('/detalhe/pedido/' + idPedido + '/usuario/' + idUsuario);
    return resposta.data;
}

/* CONSULTAR PEDIDO DO USUÁRIO*/
export async function ConsultarPedido(id){
    const resposta = await api.get('/pedido/' + id + '/usuario');
    return resposta.data;
}

/* INSERIR AVALIAÇÃO */
export async function avaliarProduto(idProduto, idUser, descricao, nota) {
    const resposta = await api.post(`/produto/${idProduto}/usuario/${idUser}/avaliacao`, {
        descricao: descricao,
        nota: nota
    })
    return resposta.data;
}

/*ALTERAR AVALIAÇÃO */
export async function deletarAvaliacao(id) {
    const resposta = await api.put(`/avaliacao/produto/${id}`)
    return resposta.data;
}

/* BUSCAR AVALIAÇÃO */
export async function buscarAval1(idProduto, idUser){
    const resposta = await api.get(`/avaliacao/produto/${idProduto}/usuario/${idUser}`);
    return resposta.data;
}

export async function buscarAval2(id) {
    const resposta = await api.get(`/avaliacao/produto/${id}`);
    return resposta.data;
}

/* BUSCAR POR ID */
export async function BuscarPorID(id){
    const resposta = await api.get(`/usuario/produto/${id}`);
    return resposta.data
}