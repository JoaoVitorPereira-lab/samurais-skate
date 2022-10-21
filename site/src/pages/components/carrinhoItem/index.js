import './index.scss'

export default function Carrinho() {

    return (
        <div className="div-produto">        
            <img src="../images/american-express.png" alt="" width="270" height="220"/>

            <text> ROLAMENTO RED BONES</text>

            <div>
                <button> - </button>
                <input type="number"/>
                <button> + </button>
            </div>

            <span> R$ 199,90 </span>
        </div>
    )
}