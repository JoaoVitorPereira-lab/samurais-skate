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

export async function CadastrarLogin (email, senha){
    const resposta = await api.post ('/api/cadastro',{
        email: email,
        senha: senha
    })

    return resposta.data
}