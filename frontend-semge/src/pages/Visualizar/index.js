import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

import { Container, ConteudoTitulo, BotaoAcao, ButtonInfo, Titulo, ConteudoProd } from './styles';

export const Visualizar = (props) => {

    const [data, setData] = useState([]);

    const [id] = useState(props.match.params.id);

    useEffect(() => {
        const getUsuario = async () => {
            await fetch("http://127.0.0.1:8000/visualizar/" + id)
                .then((response) => response.json())
                .then((responseJson) => {
                    //console.log(responseJson);
                    setData(responseJson);
                });
        }
        getUsuario();
    }, [id]);
    return (
        <Container>
            <ConteudoTitulo>
                <Titulo>Visualizar</Titulo>
                <BotaoAcao>
                    <Link to="/">
                        <ButtonInfo>Listar</ButtonInfo>
                    </Link>
                </BotaoAcao>
            </ConteudoTitulo>
            <ConteudoProd>Nome: {data.nome}</ConteudoProd>
            <ConteudoProd>E-mail: {data.email}</ConteudoProd>
            <ConteudoProd>Telefone: {data.telefone}</ConteudoProd>
            <ConteudoProd>CPF: {data.cpf}</ConteudoProd>
        </Container>
    );
}