import { Router } from "express";
import { Listar, removerEndereco, Salvar } from "../Repository/EnderecoRepository.js";

const server = Router();

server.get('/api/usuario/:id/endereco', async (req, resp) =>{
    try {
        const id = req.params.id;

        const r = await Listar(id);

        resp.send(r);
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})


server.post('/api/usuario/:id/endereco', async (req, resp) =>{
    try {
        const id = req.params.id;
        const endereco = req.body;

        if (!endereco.referencia) throw new Error("Referência é obrigatória!");
        if (!endereco.cep) throw new Error("CEP é obrigatório!");
        if (!endereco.rua) throw new Error("Rua é obrigatória!");
        if (!endereco.numero) throw new Error("Número é obrigatório!");
        if (!endereco.complemento) throw new Error("Complemento é obrigatóri!");
        if (!endereco.bairro) throw new Error("Bairro é obrigatório!");
        if (!endereco.cidade) throw new Error("Cidade é obrigatório!");
        if (!endereco.estado) throw new Error("Estado é obrigatório!");

        const r = await Salvar(id, endereco);

        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})


server.delete('/api/endereco/:idendereco/usuario/:idusuario', async (req, resp) => {
    try {
        const idEndereco = req.params.idendereco;
        const idUsuario = req.params.idusuario;
  
        await removerEndereco(idEndereco, idUsuario);
  
        resp.status(204).send();
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
  })

export default server;