export default function Estrela(props) {

    console.log(props.aval)

    return(
        <main>

            {props.aval == 0 &&
                <img src="/images/aval0.png" alt="" />
            }
            {props.aval > 0 && props.aval <= 1 &&
                <img src="/images/aval1.png" alt="" />
            }
            {props.aval > 1 && props.aval <= 2 &&
                <img src="/images/aval2.png" alt="" />
            }
            {props.aval > 2 && props.aval <= 3 &&
                <img src="/images/aval3.png" alt="" />
            }
            {props.aval > 3 && props.aval <= 4 &&
                <img src="/images/aval4.png" alt="" />
            }
            {props.aval > 4 && props.aval <= 5 &&
                <img src="/images/aval5.png" alt="" />
            }
            

            
        </main>
    );
}