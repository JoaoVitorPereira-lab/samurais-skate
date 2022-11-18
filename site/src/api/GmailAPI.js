import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:5000'
})

export async function EnviarEmailAoCriar(nome, sobrenome, email){
    const resposta = await api.post('/enviar-email', {
        nome:nome, 
        sobrenome: sobrenome,
        email:email
    });
    return resposta.status;
}


export async function EnviarEmailAoComprar(nome, sobrenome, email){
    const resposta = await api.post('/pedido-email', {
        nome:nome, 
        sobrenome: sobrenome,
        email:email
    });
    return resposta.status;
}

export async function EnviarEmailStatus(nome, sobrenome, email, status){
    const resposta = await api.post('/pedido-email', {
        nome:nome, 
        sobrenome: sobrenome,
        email:email,
        status:status
    });
    return resposta.status;
}