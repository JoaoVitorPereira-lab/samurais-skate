import axios from "axios";
const api = axios.create({
    baseURL:'http://localhost:5000'
})


export default function Login(email,senha){
    const resposta = await api.post('/api/login', {
        email: email,
        senha: senha
    })
    return resposta.data
}