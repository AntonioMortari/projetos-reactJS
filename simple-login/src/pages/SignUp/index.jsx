import { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import fetchData from '../../axios/config'

import Conteiner from '../../components/Main'
import ErrorMessage from '../../components/ErrorMessage'

// elements chakraUI
import {
    Stack,
    FormLabel,
    Input,
    FormControl,
    Button
} from '@chakra-ui/react'


const initialStates = {
    name:'',
    lastName:'',
    email:'',
    password:'',
    password2:''
}

function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLogged = useSelector(state => state.isLogged)

    useEffect(() =>{
        isLogged && navigate('/profile')
    })

    // lógica para deixar o formulario responsivo
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [wrapForm, setWrapForm] = useState('')

    window.addEventListener('load', () =>{
        setWindowWidth(window.innerWidth)
        
        if(window.innerWidth < 800){
            setWrapForm('column')
        }else{
            setWrapForm('row')
        }
    })
    window.addEventListener('resize', () =>{
        setWindowWidth(window.innerWidth)
        
        if(window.innerWidth < 800){
            setWrapForm('column')
        }else{
            setWrapForm('row')
        }
    })

    // estados
    const [values, setValues] = useState(initialStates)
    const [isError, setIsError] = useState(false)
    const [messageError, setMessageError] = useState('')


    // funções
    const onChange = (e) =>{
        setIsError(false)
        setMessageError('')

        let {name,value} = e.target
        const newState = {...values}
        newState[name] = value

        setValues(newState)
    }

    const verifyEmail = async() =>{
        const url = `users?email=${values.email}`
        await fetchData.get(url)
            .then(response => console.log(response))
            .catch(err => console.log(err))

        if(response.data.length > 0){
            return true
        }else{
            return false
        }
    }

    const addUser = async(e) =>{
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

        if(
            // se as senhas não coincidem
            values.password != values.password2
        ){
            showError("As senhas não coincidem")
            return
        }

        let emailExist = verifyEmail()

        if(emailExist){
            // se o email já esta cadastrado
            showError(`O Email ${values.email} já está cadastrado`)
            return
        }

        const url = '/users'
        await fetchData.post(url,values)
            .catch(err => console.log(err))

        dispatch({type:'LOGIN'})
    }

    const showError = (message) =>{
        setIsError(true)
        setMessageError(message)
    }
    
    return (
        <Conteiner>
            <h1>Cadastre-se</h1>
            <p>Crie sua conta para continuar!</p>

            <FormControl>
                <Stack direction={wrapForm}>
                    <FormLabel>
                        Nome
                        <Input type='text' name='name' placeholder='Digite o seu nome' focusBorderColor='primary'
                        onChange={onChange}
                        />
                    </FormLabel>

                    <FormLabel>
                        Sobrenome
                        <Input type='text' name='lastName' placeholder='Digite o seu sobrenome' focusBorderColor='primary'
                        onChange={onChange}
                        />
                    </FormLabel>
                </Stack>

                <FormLabel>
                    Email
                    <Input type='email' name='email' placeholder='Digite o seu melhor email' focusBorderColor='primary'
                    onChange={onChange}
                    />
                </FormLabel>

                <FormLabel>
                    Senha
                    <Input type='password' name='password' placeholder='Digite o seu melhor email' focusBorderColor='primary'
                    onChange={onChange}
                    />
                </FormLabel>

                <FormLabel>
                    Repita a senha
                    <Input type='password' name='password2' placeholder='Digite o seu melhor email' focusBorderColor='primary'
                    onChange={onChange}
                    />
                </FormLabel>

                <Button colorScheme='messenger' bg='primary' color='bgmain' mt='30px' onClick={addUser}>
                    Completar Cadastro
                </Button>

                {isError && (
                    <ErrorMessage message={messageError} />
                )}

            </FormControl>

            <p>Já tem uma conta? <Link to='/'>Faça Login</Link></p>
        </Conteiner>
    );
}

export default SignUp;