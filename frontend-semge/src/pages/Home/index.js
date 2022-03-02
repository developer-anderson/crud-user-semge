import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaRegPlusSquare, FaWrench, FaRegClipboard } from 'react-icons/fa';

import { Container, ConteudoTitulo, BotaoAcao, ButtonSuccess, Table, Titulo, ButtonPrimary, ButtonWarning, ButtonDanger, AlertSuccess, AlertDanger } from './styles';

export const Home = () => {

  const [data, setData] = useState([]);

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  });

  const getUsuarios = async () => {
    fetch("http://127.0.0.1:8000/usuarios")
      .then((response) => response.json())
      .then((responseJson) => (
        console.log(responseJson),
        setData(responseJson.Usuarios)
      ));
  }

  const apagarUsuario = async (idUsuario) => {
    //console.log(idUsuario);
    await fetch("http://127.0.0.1:8000/delete/" + idUsuario)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        setStatus({
          type: 'success',
          mensagem: responseJson.mensagem
        });
        getUsuarios();
      })
  };

  useEffect(() => {
    getUsuarios();
  }, [])

  return (
    <Container>
      <ConteudoTitulo>
        <Titulo>Lista de usuário</Titulo>
        <BotaoAcao>
          <Link to="/cadastrar">
            <ButtonSuccess>   <FaRegPlusSquare /> Cadastrar</ButtonSuccess>
          </Link>
        </BotaoAcao>
      </ConteudoTitulo>

      {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
      {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}

      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>#</th>
            <th>#</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(data).map(Usuario => (
            <tr key={Usuario.id}>
              <td>{Usuario.nome}</td>
              <td>{Usuario.email}</td>
              <td>
                <Link to={"/visualizar/" + Usuario.id}>
                  <FaRegClipboard />
                </Link>{" "}
              </td>
              <td>
                <Link to={"/editar/" + Usuario.id}>
                  <FaWrench />
                </Link>{" "}
              </td>

              <td>


                <FaTrashAlt onClick={() => apagarUsuario(Usuario.id)} />

              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
