import "./index.scss"

import { toast } from 'react-toastify'

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

import Storage from 'local-storage'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function Cabecalho(){
    const navigate = useNavigate();

    function IrParaHome(nome){
        confirmAlert({
            title: 'Ir para home',
            message: `Deseja ir para a home e deslogar do administrador ${nome}?`,
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => {
                        Storage.remove('admin-logado')
                        navigate('/')
                        toast.dark(`Administrador ${nome} deslogado`)
                    }
                },
                {
                    label: 'Não'
                }
            ]
        })
    }

    function sairAdmin(nome){
        confirmAlert({
            title: `Deslogar do Administrador ${nome}`,
            message: `Deseja deslogar do Administrador ${nome}?`,
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => {
                        Storage.remove('admin-logado')
                        navigate('/Login')
                        toast.dark(`Administrador ${nome} deslogado`)
                    }
                },
                {
                    label: 'Não'
                }
            ]
        })
    }

    useEffect(() =>{
        if(!Storage('admin-logado') || Storage('admin-logado').length === 0) {
            toast.dark('Área apenas para administradores')
            navigate('/')
        }
    }, [])

    return(
        <div className="comp-cabecalho">
            <a onClick=
                {e => {
                    e.stopPropagation();
                    IrParaHome(Storage('admin-logado').nome);
                }}
            >
                <img src="/images/logo-branco.gif" alt=""/>
            </a>
            <p> Seja bem-vindo, {Storage('admin-logado').nome + ' ' + Storage('admin-logado').sobrenome} </p>
            <div className="bolinha"
                 onClick=
                 {e => {
                     e.stopPropagation();
                     sairAdmin(Storage('admin-logado').nome);
                 }}
            >
                <span> {Storage('admin-logado').nome[0]} </span>
            </div>
        </div>
    );
}