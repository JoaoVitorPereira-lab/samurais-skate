import axios from "axios";
const api = axios.create({
    baseURL:'http://localhost:5000'
})

export async function EnviarEmail(nome, email, telefone, data, horario, tipo){
    const resposta = await api.post('/enviar-email', {
        nome: nome, 
        email: email, 
        telefone: telefone, 
        data: data, 
        horario: horario, 
        tipo: tipo
        
    });
    return resposta.status;
}