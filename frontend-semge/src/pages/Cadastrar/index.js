import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Container, ConteudoForm, ConteudoTitulo, Titulo, BotaoAcao, ButtonInfo, AlertSuccess, AlertDanger, Form, Label, Input, ButtonSuccess } from './styles';


export const Cadastrar = () => {
  const [logradouro, setLogradouro] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [usuario, setusuario] = useState({
 
  });

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  })

  const valorInput = e => setusuario(
    { ...usuario, [e.target.name]: e.target.value },
    (e.target.value.length >= 8) ? getCep(e.target.value): ''
    
  );
  
  const options = [
    { value: 1, label: 'Administrador' },
    { value: 2, label: 'Supervisor' },
    { value: 3, label: 'Operário' },
  ];
  const getCep = async (cep) => {
    
    fetch("https://viacep.com.br/ws/"+cep+"/json/")
      .then((response) => response.json())
      .then((responseJson) => {
        setEstado(responseJson.uf)
        setCidade(responseJson.localidade)
        setLogradouro(responseJson.logradouro)
        console.log(responseJson)
      });
     
  }
  const cadastrarUsuario = async e => {
    e.preventDefault();
    //console.log(usuario.titulo);

    await fetch("http://localhost/celke/cadastrar.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usuario })
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
          <Label>Telefone: </Label>
          <Input type="text" name="telefone" placeholder="Telefone" onChange={valorInput} />
          <Label>E-mail: </Label>
          <Input type="email" name="email" placeholder="E-mail" onChange={valorInput} />

          <Label>Senha: </Label>
          <Input type="password" name="senha" placeholder="Sua senha de acesso" onChange={valorInput} />

          <Label>Data de nascimento: </Label>
          <Input type="date" name="data_nascimento" onChange={valorInput} />


          <Label>Perfil:</Label>
          <Select options={options} />

          <Label>Cep: </Label>
          <Input type="text" name="cep"  onChange={valorInput} />
          <Label>Pais: </Label>
          <Input type="text" name="pais" onChange={valorInput} />
          <Label>Estado: </Label>
          <Input type="text" name="estado" value={estado} onChange={valorInput} />
          <Label>Cidade: </Label>
          <Input type="text" name="cidade" value={cidade} onChange={valorInput} />
          <Label>Lagradouro: </Label>
          <Input type="text" name="logradouro" value={logradouro} onChange={valorInput} />
          <Label>Complemento: </Label>
          <Input type="text" name="complemento" onChange={valorInput} />

          <Label>Número: </Label>
          <Input type="text" name="numero" onChange={valorInput} />

          <ButtonSuccess type="submit">Cadastrar</ButtonSuccess>

        </Form>
      </ConteudoForm>
    </Container>
  );

}
