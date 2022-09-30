import axios from "axios";
const api = axios.create({
    baseURL:'http://localhost:5000'
})


export  async function EntrarLogin(email,senha){
    const resposta = await api.post('/api/login', {
        email: email,
        senha: senha
    })
    return resposta.data
}

export async function CadastrarLogin (email, senha, id){
    const resposta = await api.post ('/api/cadastro',{
        email: email,
        senha: senha,
        conta: id
    })

    return resposta.data
}

export async function CadastrarConta (nome, sobrenome) {
    const resposta = await api.post ('/api/cadastro/informacoes', {
        nome: nome,
        sobrenome: sobrenome
    })

    return resposta.data
}