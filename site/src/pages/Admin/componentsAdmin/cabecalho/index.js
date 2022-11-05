import "./index.scss"

import { toast } from 'react-toastify'

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

import Storage from 'local-storage'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Cabecalho(){
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');

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

    function PegarNomeAdmin(){
        const r = Storage('admin-logado').nome
        setNome(r);
    }

    function PegarSobrenomeAdmin(){
        const r = Storage('admin-logado').sobrenome
        setSobrenome(r);
    }

    useEffect(() => {
        PegarNomeAdmin();
        PegarSobrenomeAdmin();
    }, [])

    return(
        <div className="comp-cabecalho">
            <a onClick=
                {e => {
                    e.stopPropagation();
                    IrParaHome(nome);
                }}
            >
                <img src="/images/logo-branco.gif" alt=""/>
            </a>
            <p> Seja bem-vindo, {nome + ' ' + sobrenome} </p>
            <div className="bolinha"
                 onClick=
                 {e => {
                     e.stopPropagation();
                     sairAdmin(nome);
                 }}
            >
                <span> {nome.toUpperCase()[0]} </span>
            </div>
        </div>
    );
}