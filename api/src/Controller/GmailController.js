import { Router } from "express";
import nodemailer from 'nodemailer'

const server = Router();

server.post('/enviar-email', (req,resp) => {
    let dados = req.body;
    const transport = nodemailer.createTransport({
        host: process.env.HOST,
        port: 587,
        service: process.env.SERVICE,
        secure: process.env.SECURE,
        auth:{
            user: process.env.EMAIL,
            pass: process.env.SENHA
        }
    })

    const message ={
        from: process.env.EMAIL,
        to: dados.email,
        subject:"Samurai's Skate shop",
        html:`
        <div style="background-color:#f2f3f5;padding:10px;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
        <div style="max-width:650px;margin:0 auto">
            <div style="background:#fff;font-size:14pt;color:#686f7a;border-top:4px solid rgb(229, 42, 69);margin-bottom:20px">
                <div style="float:left;font-size:0.8em;border-bottom:1px solid #f2f3f5;padding:20px 20px">
                    <div style="float:left;margin-top:15px;margin-left:15px;">
                    <b> Samurai's Skate shop <b/> <sup style="font-size:10px">©</sup>
                    </div>
                </div>
                <div style="padding:10px 20px;clear:both">
                    <div style="font-size:0.8em;line-height:1.5em;border-bottom:1px solid #f2f3f5;padding-bottom:10px;margin-bottom:10px;">
                        <p>
                            <a style="text-decoration:none;color:black">
                                <b>Sua conta foi criada com sucesso, ${dados.nome} ${dados.sobrenome} </b>
                            </a>
                        </p>
                        <div style="color:#000">
                            <p style="color:#000">
                                Boas compras!
                            </p>
                        </div>
                        <p style="font-size:14px;margin-top:50px;">
                            Atenciosamente,<br>
                            Samurai's Skate shop <br>
                            <span style="color:#A52A2A"> ** Este é um e-mail automático, não responda. </span>
                        </p>
                    </div>
                </div>
            </div>
            <div style="font:1em;color:#686f7a">
                <p style="font-size:0.7em;color:#686f7a">
                    Samurai's Skate shop <br>
                    Sede: R. Ave Maria, 78 – CEP: 04773-180 <br>
                    Inst.: Av. Cel. Octaviano de Freitas Costa, 463 <br>
                    CEP: 04773-00 – Veleiros – São Paulo – SP.<br>
                    Tel: (11) 94002-8922
                </p>
            </div>
        </div>
        `
       }

    transport.sendMail(message, (error, info)=>{
        if(error){
            return resp.status(400).send('Erro, tente novamente')
        }
        return resp.status(200).send('Email enviado com sucesso')
    })

})

server.post('/pedido-email', (req,resp) => {
    let dados = req.body;
    const transport = nodemailer.createTransport({
        host: process.env.HOST,
        port: 587,
        service: process.env.SERVICE,
        secure: process.env.SECURE,
        auth:{
            user: process.env.EMAIL,
            pass: process.env.SENHA
        }
    })

    const message ={
        from: process.env.EMAIL,
        to: dados.email,
        subject:"Samurai's Skate shop",
        html:`
        <div style="background-color:#f2f3f5;padding:10px;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
        <div style="max-width:650px;margin:0 auto">
            <div style="background:#fff;font-size:14pt;color:#686f7a;border-top:4px solid rgb(229, 42, 69);margin-bottom:20px">
                <div style="float:left;font-size:0.8em;border-bottom:1px solid #f2f3f5;padding:20px 20px">
                    <div style="float:left;margin-top:15px;margin-left:15px;">
                    <b> Samurai's Skate shop <b/> <sup style="font-size:10px">©</sup>
                    </div>
                </div>
                <div style="padding:10px 20px;clear:both">
                    <div style="font-size:0.8em;line-height:1.5em;border-bottom:1px solid #f2f3f5;padding-bottom:10px;margin-bottom:10px;">
                        <p>
                            <a style="text-decoration:none;color:black">
                                <b>${dados.nome} ${dados.sobrenome}, seu pedido foi feito com sucesso!!! </b>
                            </a>
                        </p>
                        <div style="color:#000">
                            <p style="color:#000">
                                Acompanhe o status do pedido pelo nosso site.
                            </p>
                        </div>
                        <p style="font-size:14px;margin-top:50px;">
                            Atenciosamente,<br>
                            Samurai's Skate shop <br>
                            <span style="color:#A52A2A"> ** Este é um e-mail automático, não responda. </span>
                        </p>
                    </div>
                </div>
            </div>
            <div style="font:1em;color:#686f7a">
                <p style="font-size:0.7em;color:#686f7a">
                    Samurai's Skate shop <br>
                    Sede: R. Ave Maria, 78 – CEP: 04773-180 <br>
                    Inst.: Av. Cel. Octaviano de Freitas Costa, 463 <br>
                    CEP: 04773-00 – Veleiros – São Paulo – SP.<br>
                    Tel: (11) 94002-8922
                </p>
            </div>
        </div>
        `
       }

    transport.sendMail(message, (error, info)=>{
        if(error){
            return resp.status(400).send('Erro, tente novamente')
        }
        return resp.status(200).send('Email enviado com sucesso')
    })

})

server.post('/status-email', (req,resp) => {
    let dados = req.body;
    const transport = nodemailer.createTransport({
        host: process.env.HOST,
        port: 587,
        service: process.env.SERVICE,
        secure: process.env.SECURE,
        auth:{
            user: process.env.EMAIL,
            pass: process.env.SENHA
        }
    })

    const message ={
        from: process.env.EMAIL,
        to: dados.email,
        subject:"Samurai's Skate shop",
        html:`
        <div style="background-color:#f2f3f5;padding:10px;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
        <div style="max-width:650px;margin:0 auto">
            <div style="background:#fff;font-size:14pt;color:#686f7a;border-top:4px solid rgb(229, 42, 69);margin-bottom:20px">
                <div style="float:left;font-size:0.8em;border-bottom:1px solid #f2f3f5;padding:20px 20px">
                    <div style="float:left;margin-top:15px;margin-left:15px;">
                    <b> Samurai's Skate shop <b/> <sup style="font-size:10px">©</sup>
                    </div>
                </div>
                <div style="padding:10px 20px;clear:both">
                    <div style="font-size:0.8em;line-height:1.5em;border-bottom:1px solid #f2f3f5;padding-bottom:10px;margin-bottom:10px;">
                        <p>
                            <a style="text-decoration:none;color:black">
                                <b>${dados.nome} ${dados.sobrenome}, o status do seu pedido foi alterado para <span style="color:#E52A45"> ${dados.status} </span> </b>
                            </a>
                        </p>
                        <p style="font-size:14px;margin-top:50px;">
                            Atenciosamente,<br>
                            Samurai's Skate shop <br>
                            <span style="color:#A52A2A"> ** Este é um e-mail automático, não responda. </span>
                        </p>
                    </div>
                </div>
            </div>
            <div style="font:1em;color:#686f7a">
                <p style="font-size:0.7em;color:#686f7a">
                    Samurai's Skate shop <br>
                    Sede: R. Ave Maria, 78 – CEP: 04773-180 <br>
                    Inst.: Av. Cel. Octaviano de Freitas Costa, 463 <br>
                    CEP: 04773-00 – Veleiros – São Paulo – SP.<br>
                    Tel: (11) 94002-8922
                </p>
            </div>
        </div>
        `
       }

    transport.sendMail(message, (error, info)=>{
        if(error){
            return resp.status(400).send('Erro, tente novamente')
        }
        return resp.status(200).send('Email enviado com sucesso')
    })

})

export default server;