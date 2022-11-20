export default function Estrela(props) {

    

    return(
        <main className="estrela-container">

            {props.aval == 0 || !props.aval &&
                <img src="/images/aval0.png" alt="" width={props.width}/>
            }
            {props.aval > 0 && props.aval <= 1 &&
                <img src="/images/aval1.png" alt="" width={props.width}/>
            }
            {props.aval > 1 && props.aval <= 2 &&
                <img src="/images/aval2.png" alt="" width={props.width}/>
            }
            {props.aval > 2 && props.aval <= 3 &&
                <img src="/images/aval3.png" alt=""  width={props.width}/>
            }
            {props.aval > 3 && props.aval <= 4 &&
                <img src="/images/aval4.png" alt="" width={props.width}/>
            }
            {props.aval > 4 && props.aval <= 5 &&
                <img src="/images/aval5.png" alt="" width={props.width}/>
            }
            

            
        </main>
    );
}