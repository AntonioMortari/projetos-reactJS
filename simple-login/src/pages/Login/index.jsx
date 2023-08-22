import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import fetchData from '../../axios/config'

import { Link } from 'react-router-dom';
import Conteiner from './styles'

import {
    Button,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'



const initialStates = {
    email:'',
    password:''
}

function Login() {
    const [values, setValues] = useState(initialStates)
    const [dataUser, setDataUser] = useState([])

    const navigate = useNavigate()

    const verifyUser = async(e) =>{
        e.preventDefault()
        let newDataUser;

        const url = `/users?email=${values.email}`

        await fetchData.get(url)
        // aqui fazemos uma requisição a api fake para ver se o usuário existe
            .then(response => {
                setDataUser(response.data)
                newDataUser = [...response.data]
                // armazenamos a resposta em uma outra variável para fazer as verificações
                newDataUser = newDataUser[0]
            })
            .catch(err => console.log(err))

        if(newDataUser){
            // se o usuário existe, ou seja, o email está correto
            if(newDataUser.password == values.password && newDataUser.email == values.email){
                // verificamos se a senha está correta, se estiver direciona ao profile
                navigate('/profile')
            }else{
                // se não, exibe um alerta que a senha esta incorrete
                alert('Senha incorreta!')
            }

        }else{
            // caso o email não exista, exiba um alerta
            alert('Usuário não encontrado!')
        }
    }

    const onChange = (e) =>{
        const {name,value} = e.target

        let newState = {...values}

        newState[name] = value

        setValues(newState)
    }
    

    return (
        <Conteiner>
            <h1>Login</h1>
            <p>Bem-vindo(a) novamente!, Faça login para continuar.</p>

            <FormControl>

                <FormLabel mt='30px'>
                    Email
                    <Input name='email' type='email' w='95%' variant='flushed' placeholder='Digite seu email' focusBorderColor='primary' size='md'
                    // eventos
                    onChange={onChange}
                    onKeyDown={(e) => e.key == 'Enter' && verifyUser(e) }
                    />
                </FormLabel>

                <FormLabel>
                    Senha

                    <Input name='password' type='password' w='95%' variant='flushed' placeholder='Digite sua senha' focusBorderColor='primary' size='md'
                    // eventos
                    onChange={onChange}
                    onKeyDown={(e) => e.key == 'Enter' && verifyUser(e)}
                    />
                </FormLabel>

                <Button w='40%' colorScheme='messenger' bg='primary' color='bgmain' mt='30px'
                onClick={verifyUser}
                >
                    Entrar
                </Button>
            </FormControl>

            <p>Não tem uma conta? <Link to='/sign-up'>Cadastre-se</Link></p>
        </Conteiner>
    );
}

export default Login;