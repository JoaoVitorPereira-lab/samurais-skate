import randomString from 'randomstring'
import { buscarCupom, atualizarCupom } from "../repository/cupomRepository.js";

export async function acharCupom(cod) {
    let idCupom = null;

    const cupom = await buscarCupom(cod);
    if (cupom) {
        if (cupom.restante > 0) {
            idCupom = cupom.id;
            await atualizarCupom(cod);
        }
    }

    return idCupom;
}


export function criarNotaFiscal() {
    return randomString.generate(11);
}


export function criarNovoPedido(idUsuario, idCupom, info) {
    
    let agora = new Date();
    let notaFiscal = criarNotaFiscal();
    
    return {
        idUsuario: idUsuario,
        idEndereco: info.idEndereco,
        idCupom: idCupom,
        data: agora,
        notaFiscal: notaFiscal,
        status: 'Confirmando Pagamento',
        tipoPagamento: 'Cartão'
    }
    
}