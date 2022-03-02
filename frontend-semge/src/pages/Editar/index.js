import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Container, ConteudoForm, ConteudoTitulo, Titulo, BotaoAcao, ButtonInfo, AlertSuccess, AlertDanger, Form, Label, Input, ButtonWarning } from './styles';

export const Editar = (props) => {

    const [id] = useState(props.match.params.id);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [cep, setCep] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [numero, setNumero] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [data_nascimento, setDataNascimento] = useState('');
    const [complemento, setComplemento] = useState('');
    const [pais, setPais] = useState('');
    const [senha, setSenha] = useState('');
    const [id_perfil, setIdPerfil] = useState('');
    const [dthr_atualizacao, setDataAtualizacao] = useState('');
    const select = {
        display: "block",
        width: "100%",
        padding: ".375rem 2.25rem .375rem .75rem",
        'font-size': "1rem",
        'font-weight': "400",
        "-moz-padding-start": "calc(0.75rem - 3px)",
        'line-height': "1.5",
        color: "#212529",
        'background-color': "#fff",
        "background-repeat": "no-repeat",
        "background-position": "right .75rem center",
        "background-size": "16px 12px",
        "border": "1px solid #ced4da",
        "border-radius": ".25rem",
        "transition": "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
        "-webkit-appearance": "none",
        "-moz-appearance": "none",
        "appearance": "none",
      };
    const options = [
        { id: 1, name: 'Administrador' },
        { id: 2, name: 'Supervisor' },
        { id: 3, name: 'Operário' },
    ];
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })
    const horario = new Date();

    const editUsuario = async e => {
        e.preventDefault();

        await fetch("http://127.0.0.1:8000/update/" + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, telefone, cep, cpf, estado, cidade, logradouro, data_nascimento, id_perfil, senha, pais, complemento, dthr_atualizacao, numero })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
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
                    mensagem: "Erro ao editar usuário"
                });
            });
    }

    useEffect(() => {
        const getProduto = async () => {
            await fetch("http://127.0.0.1:8000/visualizar/" + id)
                .then((response) => response.json())
                .then((responseJson) => {
                    setNome(responseJson.nome);
                    setEmail(responseJson.email);
                    setTelefone(responseJson.telefone);
                    setCpf(responseJson.cpf);
                    setEstado(responseJson.estado);
                    setCidade(responseJson.cidade);
                    setCep(responseJson.cep);
                    setDataNascimento(responseJson.data_nascimento);
                    setLogradouro(responseJson.logradouro);
                    setIdPerfil(responseJson.id_perfil);
                    setSenha(responseJson.senha);
                    setPais(responseJson.pais);
                    setNumero(responseJson.numero);
                    setComplemento(responseJson.complemento);
                    setDataAtualizacao(horario.getFullYear() + '-' + horario.getMonth() + '-' + horario.getDay() + ' ' + horario.getHours() + ':' + horario.getMinutes() + ':' + horario.getSeconds());

                });
        }
        getProduto();
    }, [id]);

    return (

        <Container>

            <ConteudoForm>
                <ConteudoTitulo>
                    <Titulo>Editando usuário {nome}</Titulo>
                    <BotaoAcao>
                        <Link to="/">
                            <ButtonInfo>Visualizar todos usuários</ButtonInfo>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>

                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}


                <Form onSubmit={editUsuario}>

                    <Label>Nome completo: </Label>
                    <Input type="text" name="nome" value={nome} placeholder="nome do usuário" onChange={e => setNome(e.target.value)} />

                    <Label>CPF: </Label>
                    <Input type="text" name="cpf" value={cpf} placeholder="CPF" onChange={e => setCpf(e.target.value)} />
                    <Label>Telefone: </Label>
                    <Input type="text" name="telefone" value={telefone} placeholder="Telefone" onChange={e => setTelefone(e.target.value)} />
                    <Label>E-mail: </Label>
                    <Input type="email" name="email" value={email} placeholder="E-mail" onChange={e => setEmail(e.target.value)} />

                    <Label>Senha: </Label>
                    <Input type="password" name="senha" placeholder="Sua senha de acesso" onChange={e => setSenha(e.target.value)} />

                    <Label>Data de nascimento: </Label>
                    <Input type="date" name="data_nascimento" value={data_nascimento} onChange={e => setDataNascimento(e.target.value)} />


                    <Label>Perfil:</Label>
                    <select style={select} value={id_perfil} onChange={e => setIdPerfil(e.target.value)}>
                        {options.map((item, index) => (
                            <option value={item.id}>{item.name}</option>
                        ))}
                    </select>

                    <Label>Cep: </Label>
                    <Input type="text" name="cep" value={cep} onChange={e => setCep(e.target.value)} />
                    <Label>Pais: </Label>
                    <Input type="text" name="pais" value={pais} onChange={e => setPais(e.target.value)} />
                    <Label>Estado: </Label>
                    <Input type="text" name="estado" value={estado} onChange={e => setEstado(e.target.value)} />
                    <Label>Cidade: </Label>
                    <Input type="text" name="cidade" value={cidade} onChange={e => setCidade(e.target.value)} />
                    <Label>Lagradouro: </Label>
                    <Input type="text" name="logradouro" value={logradouro} onChange={e => setLogradouro(e.target.value)} />
                    <Label>Complemento: </Label>
                    <Input type="text" name="complemento" value={complemento} onChange={e => setComplemento(e.target.value)} />

                    <Label>Número: </Label>
                    <Input type="text" name="numero" value={numero} onChange={e => setNumero(e.target.value)} />

                    <ButtonWarning type="submit">Atualizar dados </ButtonWarning>
                </Form>

            </ConteudoForm>
        </Container>
    );
}