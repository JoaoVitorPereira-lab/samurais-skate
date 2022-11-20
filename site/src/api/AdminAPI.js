import axios from "axios";
const api = axios.create({
    baseURL:'http://localhost:5000'
})

/* CADASTRAR PRODUTO */
export async function CadastrarProduto (IdMarca, IdCategoria, IdTipo, idTipoSkate, nome, descricao, importado, promocao, preco, estoque){
    const resposta = await api.post('/api/produto', {
        IdMarca: IdMarca, 
        IdCategoria: IdCategoria,
        IdTipo: IdTipo,
        idTipoSkate: idTipoSkate,
        nome: nome,
        descricao: descricao,
        importado: importado,
        promocao: promocao,
        preco: preco,
        estoque: estoque
    })

    return resposta.data;
}


/* CONSULTAR PRODUTO */
export async function ConsultarProduto(){
    const resposta = await api.get('/api/admin/produto');
    return resposta.data;
}


/* ALTERAR PRODUTO */
export async function AlterarProduto(id, IdMarca, IdCategoria, IdTipo, nome, descricao, promocao, preco, estoque){

    const resposta = await api.put(`api/admin/${id}`, {
        IdMarca: IdMarca, 
        IdCategoria: IdCategoria,
        IdTipo: IdTipo,
        nome: nome,
        descricao: descricao,
        promocao: promocao,
        preco: preco,
        estoque: estoque
    })
    
    return resposta.data;
}


/* BUSCAR POR ID */
export async function BuscarPorID (id){
    const resposta = await api.get(`/api/produto/${id}`);
    return resposta.data
}

/* LISTAR CATEGORIA */
export async function ListarCategoria(){
    const resposta = await api.get('/api/categoria');
    return resposta.data;
}


// BUSCAR PRODUTO POR NOME //
export async function BuscarProdutoPorNome(nome){
    const resposta = await api.get(`/api/buscar?nome=${nome}`);
    return resposta.data;
}


/* BUSCAR IMAGEM */
export async function BuscarImagem(imagem){
    return `${api.getUri()}/${imagem}`  
}


/* ENVIAR IMAGEM */
export async function SalvarImagens(id, imagem, imagem2){
    const formData = new FormData();
    formData.append('imagens', imagem);
    formData.append('imagens', imagem2);
    
    const resposta = await api.put(`/admin/produto/${id}/imagem` , formData, {
        headers:{
            "Content-Type": "multipart/form-data"
        },
    });
    return resposta.status;
}


/* LOGIN DO ADM */
export async function LoginAdm(email,senha){
        const resposta = await api.post('/api/login/adm', {
            email: email,
            senha: senha
        })
        return resposta.data
}


/* REMOVER PRODUTO */
export async function RemoverProduto(id) {
    const r = await api.delete('/api/produto/' + id);
    return r.data;
} 