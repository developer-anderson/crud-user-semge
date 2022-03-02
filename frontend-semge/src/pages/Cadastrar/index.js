import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Container, ConteudoForm, ConteudoTitulo, Titulo, BotaoAcao, ButtonInfo, AlertSuccess, AlertDanger, Form, Label,  Input, ButtonSuccess } from './styles';

export const Cadastrar = () => {

  const [produto, setProduto] = useState({
    titulo: '',
    descricao: ''
  });

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  })

  const valorInput = e => setProduto({ ...produto, [e.target.name]: e.target.value });
  const options = [
    { value: 1, label: 'Administrador' },
    { value: 2, label: 'Supervisor' },
    { value: 3, label: 'Operário' },
  ];
  const cadastrarUsuario = async e => {
    e.preventDefault();
    //console.log(produto.titulo);

    await fetch("http://localhost/celke/cadastrar.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ produto })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson)
        if (responseJson.erro) {
          setStatus({
            type: 'erro',
            mensagem: responseJson.mensagem
          });
        } else {
          setStatus({
            type: 'success',
            mensagem: responseJson.mensagem
          });
        }
      }).catch(() => {
        setStatus({
          type: 'erro',
          mensagem: 'Erro ao cadastrar usuário!'
        });
      });
  }

  return (
    
    <Container>
      <ConteudoForm>
        <ConteudoTitulo>
          <Titulo>Cadastrar novo usuário</Titulo>
          <BotaoAcao>
            <Link to="/">
              <ButtonInfo>Listar</ButtonInfo>
            </Link>
          </BotaoAcao>
        </ConteudoTitulo>

        {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
        {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}

        <Form onSubmit={cadastrarUsuario}>
          <Label>Nome completo: </Label>
          <Input type="text" name="nome" placeholder="nome do usuário" onChange={valorInput} />

          <Label>CPF: </Label>
          <Input type="text" name="cpf" placeholder="CPF" onChange={valorInput} />

          <Label>E-mail: </Label>
          <Input type="email" name="email" placeholder="E-mail" onChange={valorInput} />

          <Label>Senha: </Label>
          <Input type="password" name="senha" placeholder="Sua senha de acesso" onChange={valorInput} />
           
          <Label>Data de nascimento: </Label>
          <Input type="date" name="datanascimento" onChange={valorInput} />
          
          <Label>Perfil:</Label>
          <Select options={options} />

          <ButtonSuccess type="submit">Cadastrar</ButtonSuccess>

        </Form>
      </ConteudoForm>
    </Container>
  );
}
