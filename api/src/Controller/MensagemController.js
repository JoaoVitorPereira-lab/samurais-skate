import { Router } from "express";
import nodemailer from 'nodemailer'
const server = Router();


//Enviar email após fazer um agendamento
server.post('/enviaremail', async (req, resp) =>{
    let data = req.body;
    const transport = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        secure:process.env.SECURE,
        auth:{
            user: process.env.EMAIL,
            pass: process.env.SENHA
        }
    })
    
    const message = {
    from: process.env.EMAIL,
     to: data.email,
     subject:'Samurais Skate Shop',
     html: `
     <h1>Samurai's Skate Shop</h1>
     <h3> Seja Bem vindo a Samurai's Skate Shop, a loja de produtos relacionados a skate feita para você </h3>
     <h3> Informações de sua conta </h3>
     <p>Nome: ${data.nome}</p>
     <p>Email: ${data.email}</p>
     <p>Telefone: ${data.telefone}</p>
     <p>Data: ${data.data}</p>
     <p>Horário: ${data.horario}</p>
     <p>Tipo: ${data.tipo}</p>
     `
     
    }
    transport.sendMail(message, (error, info)=> {
        if(error){
            return resp.status(400).send(error)
        }
        return resp.status(200).send('Email enviado com sucesso!')
    })
})


export default server;