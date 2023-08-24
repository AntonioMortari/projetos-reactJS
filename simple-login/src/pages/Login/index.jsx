import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import fetchData from '../../axios/config'

import { Link } from 'react-router-dom';
import Conteiner from '../../components/Main'

import {
    Button,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'

import ErrorMessage from '../../components/ErrorMessage';
import InputPassword from '../../components/InputPassword';


const initialStates = {
    email: '',
    password: ''
}

function Login() {
    const [values, setValues] = useState(initialStates)
    const [dataUser, setDataUser] = useState([])
    // estados de erro
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const isLogged = useSelector(state => state.isLogged)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const showError = (message) =>{
        setIsError(true)
        setErrorMessage(message)
    }

    const verifyUser = async (e) => {
        e.preventDefault()
        let newDataUser;

        if (values.email.length == '' || values.password.length == '') {
            showError('Preencha os campos corretamente!')
            return
        }

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

        if (newDataUser) {
            // se o usuário existe, ou seja, o email está correto
            if (newDataUser.password == values.password && newDataUser.email == values.email) {
                // verificamos se a senha está correta, se estiver direciona ao profile
                dispatch({type:'LOGIN'})
                localStorage.setItem('user', JSON.stringify(newDataUser.id))
                navigate(`/profile/${newDataUser.id}`)
            } else {
                // se não, exibe um alerta que a senha esta incorreta
                showError('Senha incorreta!')
            }

        } else {
            // caso o email não exista, exiba um alerta
            showError('Usuário não encontrado')
        }
    }

    const onChange = (e) => {
        setIsError(false)
        setErrorMessage('')

        const { name, value } = e.target

        let newState = { ...values }

        newState[name] = value

        setValues(newState)
    }

    useEffect(() =>{
        const idUser = JSON.parse(localStorage.getItem('user'))
        isLogged && navigate(`/profile/${idUser}`)
    },[])


    return (
    <>
        <Conteiner>
            <h1>Login</h1>
            <p>Bem-vindo(a) novamente!, Faça login para continuar.</p>

            <FormControl>

                <FormLabel mt='30px'>
                    Email
                    <Input name='email' type='email' w='95%' variant='flushed' placeholder='Digite seu email' focusBorderColor='primary' size='md'
                        // eventos
                        onChange={onChange}
                        onKeyDown={(e) => e.key == 'Enter' && verifyUser(e)}
                    />
                </FormLabel>

                <InputPassword w='95%' placeholder='Digite sua senha' name='password' size='md' onChange={onChange} onKeyDown={(e) => e.key == 'Enter' && verifyUser(e)} variant='flushed' />

                <Button w='40%' colorScheme='messenger' bg='primary' color='bgmain' mt='30px'
                    onClick={verifyUser}
                >
                    Entrar
                </Button>

                
                {isError && (
                    <ErrorMessage message={errorMessage} />
                )}


            </FormControl>

            <p>Não tem uma conta? <Link to='/sign-up'>Cadastre-se</Link></p>
        </Conteiner>
    </>
    );
}

export default Login;