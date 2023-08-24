import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import fetchData from '../../axios/config'

import Conteiner from '../../components/Main'
import ErrorMessage from '../../components/ErrorMessage'
import InputPassword from '../../components/InputPassword'

import { AiFillCheckCircle as CheckIcon } from 'react-icons/ai'


// elements chakraUI
import {
    Stack,
    FormLabel,
    Input,
    FormControl,
    Button,
    Alert
} from '@chakra-ui/react'


const initialStates = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
}

function SignUp() {
    const navigate = useNavigate()
    const isLogged = useSelector(state => state.isLogged)

    useEffect(() => {
        const idUser = localStorage.getItem('user')
        isLogged && navigate(`/profile/${idUser}`)
    })

    // lógica para deixar o formulario responsivo
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    window.addEventListener('resize', () => {
        setWindowWidth(window.innerWidth)
    })

    // estados
    const [values, setValues] = useState(initialStates)
    const [isError, setIsError] = useState(false)
    const [messageError, setMessageError] = useState('')
    const [showSucess, setShowSucess] = useState(false)


    // funções
    const onChange = (e) => {
        setIsError(false)
        setMessageError('')

        let { name, value } = e.target
        const newState = { ...values }
        newState[name] = value

        setValues(newState)
    }

    const verifyEmail = async () => {
        let dataUser;
        const url = `users?email=${values.email}`
        await fetchData.get(url)
            .then(response => dataUser = response.data)
            .catch(err => console.log(err))

        if (dataUser.length > 0) {
            return true
        } else {
            return false
        }
    }

    const addUser = async (e) => {
        e.preventDefault()

        // tratar os erros
        if (
            // se algum campo esta vazio
            values.name === '' ||
            values.lastName === '' ||
            values.email === '' ||
            values.password === '' ||
            values.password2 === ''
        ) {
            showError('Preencha os campos corretamente!')
            return
        }

        if (
            // se as senhas não coincidem
            values.password != values.password2
        ) {
            showError("As senhas não coincidem")
            return
        }


        let emailExist = await verifyEmail()
        if (emailExist) {
            // se o email já esta cadastrado
            showError(`O Email ${values.email} já está cadastrado`)
            return
        }

        const url = '/users'
        await fetchData.post(url, values)
            .catch(err => console.log(err))

        setShowSucess(true)

        setTimeout(() => {
            // mostrar a mensagem de sucesso por 9 segundos
            setShowSucess(false)
        }, 9000);

        setValues(initialStates)


    }

    const showError = (message) => {
        setIsError(true)
        setMessageError(message)
    }

    return (
        <Conteiner>
            <h1>Cadastre-se</h1>
            <p>Crie sua conta para continuar!</p>

            <FormControl>
                <Stack direction={
                    windowWidth > 800 ? 'row' : 'column'
                }>
                    <FormLabel>
                        Nome
                        <Input type='text' name='name' placeholder='Digite o seu nome' focusBorderColor='primary'
                            onChange={onChange}
                            value={values.name}
                        />
                    </FormLabel>

                    <FormLabel>
                        Sobrenome
                        <Input type='text' name='lastName' placeholder='Digite o seu sobrenome' focusBorderColor='primary'
                            onChange={onChange}
                            value={values.lastName}
                        />
                    </FormLabel>
                </Stack>

                <FormLabel>
                    Email
                    <Input type='email' name='email' placeholder='Digite o seu melhor email' focusBorderColor='primary'
                        onChange={onChange}
                        value={values.email}
                    />
                </FormLabel>

                <InputPassword txt='Digite sua senha' placeholder='Digite sua senha' w='95%' onChange={onChange} name='password' value={values.password} />

                <InputPassword txt='Repita a senha' name='password2' placeholder='Repita sua senha' w='95%' onChange={onChange} value={values.password2} />



                <Button colorScheme='messenger' bg='primary' color='bgmain' mt='30px' onClick={addUser}>
                    Completar Cadastro
                </Button>

                {isError && (
                    <ErrorMessage message={messageError} />
                )}


                {showSucess && (
                    <Alert status='success' display='flex' gap='10px' alignItems='center' mt='20px'>
                        <CheckIcon color='green' size='25' />
                        Cadastro concluído com sucesso
                    </Alert>
                )}



            </FormControl>

            <p>Já tem uma conta? <Link to='/'>Faça Login</Link></p>
        </Conteiner>
    );
}

export default SignUp;