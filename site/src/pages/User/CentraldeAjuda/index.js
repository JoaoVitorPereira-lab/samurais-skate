import Cabecalho from '../../components/cabecalho'
import Rodape from '../../components/rodape'
import Menu from '../../components/MenuConfig'

export default function CantralAjuda (){
    return(
        <main className="main-ajuda">
            <Cabecalho/>
            <Menu selecionado='ajuda'/>
            <Rodape/>
        </main>
    )
}