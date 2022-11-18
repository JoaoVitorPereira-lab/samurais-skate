import { Router } from "express";
import { inserirPagamento, inserirPedido, inserirPedidoItem } from "../repository/PedidoRepository.js";
import { criarNovoPedido } from "../Service/NovoProdutoServices.js";
import { BuscarPorID } from "../Repository/AdminRepository.js";
const server = Router();

server.post('/api/pedido/:idUsuario', async (req, resp) => {
    try {
        const { idUsuario } = req.params;
        const info = req.body;

        if(!info.idEndereco) throw new Error('Você precisa escolher um endereço');
        if(!info.idCartao) throw new Error('Você precisa escolher um cartão');
        if(!info.parcelas) throw new Error('Você precisa escolher o parcelamento');
        
        const novoPedido = criarNovoPedido(idUsuario, info);

        const idPedidoCriado = await inserirPedido(novoPedido);
        const pg = await inserirPagamento(idPedidoCriado, info.idCartao, info.parcelas);
        
        for (let item of info.produtos) {
            await BuscarPorID(item.id);
            await inserirPedidoItem(idPedidoCriado, item.id, item.qtd, item.preco);
        }

        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



export default server;