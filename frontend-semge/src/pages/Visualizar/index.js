import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

import { Container, ConteudoTitulo, BotaoAcao,ButtonPrimary, ButtonInfo, Titulo, ConteudoProd } from './styles';

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
                <Titulo>Informações do usuário: {data.nome}</Titulo>
                <BotaoAcao>
                    <Link to="/">
                        <ButtonInfo>Visualizar todos usuários</ButtonInfo>
                    </Link>
                </BotaoAcao>
                <BotaoAcao>
                    <Link  to={"/editar/" + data.id}>
                        <ButtonPrimary>Editar informações</ButtonPrimary>
                    </Link>
                </BotaoAcao>
            </ConteudoTitulo>
            <ConteudoProd>Nome: {data.nome}</ConteudoProd>
            <ConteudoProd>E-mail: {data.email}</ConteudoProd>
            <ConteudoProd>Telefone: {data.telefone}</ConteudoProd>
            <ConteudoProd>CPF: {data.cpf}</ConteudoProd>
            <ConteudoProd>Cep: {data.cep}</ConteudoProd>
            <ConteudoProd>Estado: {data.estado}</ConteudoProd>
            <ConteudoProd>Cidade: {data.cidade}</ConteudoProd>
            <ConteudoProd>Logradouro: {data.logradouro}</ConteudoProd>
            <ConteudoProd>Número: {data.numero}</ConteudoProd>
            <ConteudoProd>Complemento: {data.complemento}</ConteudoProd>
        </Container>
    );
}