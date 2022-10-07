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

//buscar imagem
export function buscarimagem(imagem){
    return `${api.getUri()}/${imagem}`
}

// BUSCAR TÊNIS POR NOME //
export async function BuscarTenisPorNome(nome){
    const resposta = await api.get(`/api/buscar/tenis?nome=${nome}`);
    return resposta.data;
}

