import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:5000'
})

export async function EnviarAoAlterar(nome, sobrenome, email, senha){
    const resposta = await api.post('/alterar-email', {
        nome:nome, 
        sobrenome:sobrenome,
        email:email,
        senha:senha
    });
    return resposta;
}

export async function EnviarAoCriar(nome, sobrenome, email, senha){
    const resposta = await api.post('/criarconta-email', {
        nome:nome, 
        sobrenome:sobrenome,
        email:email,
        senha:senha
    });
    return resposta;
}

export async function EnviarAoComprar(nome, sobrenome, email){
    const resposta = await api.post('/pedido-email', {
        nome:nome, 
        sobrenome: sobrenome,
        email:email
    });
    return resposta;
}