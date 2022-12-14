import { Router } from 'express';
import { CadastrarLogin, Login, CadastrarInformacoes, ConsultarTenis,  BuscarNomePorID, ConsultarSkate, ConsultarBone, ConsultarAcessorios, Promocoes, AlterarInfosConta, AlterarInfosLogin, ConsultarPedido, DetalhePedido, avaliarProduto, buscarAval1, deletarAvaliacao, buscarAval2, BuscarPorID, buscarProdutoImagens, ConsultarTudo, ConsultarProdutoNome} from '../repository/usuarioRepository.js'

const server = Router();


/* BUSCAR POR ID */
server.get('/usuario/produto/:id', async (req, resp) => {
    try {
      const id = Number(req.params.id);
  
      const resposta = await BuscarPorID(id);
      const imagens = await buscarProdutoImagens(id);
  
      if (!resposta)
        resp.status(404).send([]);
      else
        resp.send({
          info:resposta,
          imagens:imagens
        });
    }
  
    catch (err) {
      resp.status(400).send({
        erro: err.message
      })
    }
  })

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

server.get('/api/produtos', async (req, resp) => {
    try {
        const resposta = await ConsultarTudo();
        resp.send(resposta)
    } catch (err) {
        resp.status(401).send({
            erro: err.message
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

server.get('/api/buscar/produtos', async (req, resp) =>{
    try
    {
        const { nome } = req.query;
  
        const resposta = await ConsultarProdutoNome(nome);
  
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

server.get('/produto/:id/detalhe', async (req, resp) =>{
    try
    {
        const id = Number(req.params.id);
  
        const resposta = await BuscarNomePorID(id);
  
        if(!resposta)
          resp.status(404).send([]);
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

server.get('/api/produtos/skate', async (req, resp) =>{
    try {
        const resposta = await ConsultarSkate();
        resp.send(resposta)
    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})

server.get('/api/produtos/bone', async (req, resp) =>{
    try {
        const resposta = await ConsultarBone();
        resp.send(resposta)
    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})

server.get('/api/produtos/acessorios', async (req, resp) =>{
    try {
        const resposta = await ConsultarAcessorios();
        resp.send(resposta)
    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})

server.get('/api/produtos/promocoes', async (req, resp) =>{
    try {
        const resposta = await Promocoes();
        resp.send(resposta)
    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})

server.put('/api/usuario/conta/:id', async (req,resp) => {
    try {
        const infos = req.body;
        const {id} = req.params;

        if(!infos.sobrenome) throw new Error ("Dígite um sobrenome!")

        const resposta = await AlterarInfosConta (infos,id)

        
      if(resposta != 1)
        throw new Error('Conta não pode ser alterada!');
          else
      resp.sendStatus(204)
        
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })        
    }
})

server.put('/api/usuario/login/:id', async (req,resp) => {
    try {
        const infos = req.body;
        const {id} = req.params;
        
        if(!infos.senha) throw new Error ("Dígite uma senha")
        
        const resposta = await AlterarInfosLogin (infos,id)

        
      if(resposta != 1)
        throw new Error('Conta não pode ser alterada!');
          else
      resp.sendStatus(204)
        
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })        
    }
})

server.get('/pedido/:id/usuario', async (req, resp) =>{
    try
    {
        const id =  Number(req.params.id);
  
        const resposta = await ConsultarPedido(id);
  
        if(!resposta)
          resp.status(404).send([]);
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

server.get('/detalhe/pedido/:idPedido/usuario/:idUser', async (req, resp) =>{
    try
    {
        const IdPedido = Number(req.params.idPedido);
        const IdUser   = Number(req.params.idUser);
  
        const resposta = await DetalhePedido(IdPedido, IdUser);
  
        if(!resposta)
          resp.status(404).send([]);
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

server.post('/produto/:idProduto/usuario/:idUsuario/avaliacao', async (req, resp) => {
    try {
        

        const {idProduto, idUsuario} = req.params;
        const {descricao, nota} = req.body;

        if (!nota) throw new Error ('NOTA DO PRODUTO OBRIGATÓRIA') 

        const resposta = await avaliarProduto(idProduto, idUsuario, descricao, nota);
        console.log(resposta)
        resp.status(200).send({
            id: resposta
        });
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

server.delete('/avaliacao/produto/:id', async (req,resp) => {
    try {
        const {id} = req.params;
        
        const resposta = await deletarAvaliacao(id)

        
      if(resposta != 1)
        throw new Error('Avaliação não pôde ser alterada!');
        else
      resp.sendStatus(204)
        
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })        
    }
})

server.get('/avaliacao/produto/:idProduto/usuario/:idUser', async (req, resp) => {
    try {
        const {idProduto, idUser} = req.params;

        const resposta = await buscarAval1(idProduto, idUser);

        if(!resposta)
          resp.status(404).send([]);
        else
          resp.send(resposta);
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

server.get('/avaliacao/produto/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        const resposta = await buscarAval2(id);

        resp.send(resposta)

        
    } catch (err) {
        resp.send({
            erro: err.message
        })
    }
})

export default server;