import { Router } from 'express';
import { CadastrarLogin, Login, CadastrarInformacoes, ConsultarTenis, ConsultarTenisNome} from '../repository/usuarioRepository.js'

const server = Router();

server.post('/api/login', async (req,resp) =>{
    try {

        const {email, senha} = req.body;

        const resposta = await Login(email, senha)
        if(!resposta) throw new Error("Credencias INVÁLIDAS")
        
        resp.status(200).send(resposta)
    } 
    catch (err) {
        resp.status(401).send({
            Erro:err.message
        })
    }
})

server.post('/api/cadastro/informacoes' , async(req, resp) =>{
    try {
        const informacoes = req.body;
        if(!informacoes.nome.trim()) throw new Error('Digite um nome!')
        if(!informacoes.sobrenome.trim()) throw new Error ('Digite um sobrenome!')
        
        const resposta = await CadastrarInformacoes(informacoes)
        resp.status(200).send(resposta)
    } 
    catch (err) {
        resp.status(400).send({
            Erro: err.message
        })
    }
})

server.post('/api/cadastro' , async (req,resp) => {
    try {
        const cadastro = req.body;
        if(!cadastro.email.trim()) throw new Error ('Digite um email!')
        if(!cadastro.senha.trim()) throw new Error('Digite uma senha!')
        if(!cadastro.conta) throw new Error('Coloque o id!')
        
        const resposta = await CadastrarLogin (cadastro)
        resp.status(200).send(resposta)
    }
    catch (err) {
        resp.status(400).send({
            Erro: err.message
        })
    }
})

server.get('/api/produtos/tenis', async (req, resp) => {
    try {
        const resposta = await ConsultarTenis();
        resp.send(resposta)
    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})

server.get('/api/buscar/tenis', async (req, resp) =>{
    try
    {
        const { nome } = req.query;
  
        const resposta = await ConsultarTenisNome(nome);
  
        if(resposta.length == 0)
            resp.status(404).send( [] );
        else
            resp.send(resposta);
    }
  
    catch(err)
    {
        resp.status(400).send({
            erro: err.message
        })
    }
  })

export default server;