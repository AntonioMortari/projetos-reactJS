import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import fetchData from '../../axios/config'

import Main from '../../components/Main'

import { AiFillCheckCircle as IconCheck } from 'react-icons/ai'
import {
    Avatar,
    Stack,
    Input,
    Heading,
    Alert,
    Button as ButtonChakra
} from '@chakra-ui/react'

function Profile() {
    const [dataUser, setDataUser] = useState([])
    const [values, setValues] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const isLogged = useSelector(state => state.isLogged)

    const [showAlertError, setShowAlertError] = useState(false)
    const [messageError, setMessageError] = useState('')

    const [showAlertSucess, setShowAlertSucess] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getDataUser = async (idUser) => {
        const url = `/users/${idUser}`
        fetchData.get(url)
            .then(response => {
                setDataUser(response.data)
                setValues(response.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (isLogged) {
            const idUser = JSON.parse(localStorage.getItem('user'))
            getDataUser(idUser)
        } else {
            navigate('/')
        }
    }, [])

    const logout = () => {
        localStorage.removeItem("user")
        dispatch({ type: 'LOGOUT' })
        navigate('/')
    }

    const showError = (message) =>{
        setShowAlertError(true)
        setMessageError(message)
    }

    const saveChanges = async () => {

        if (
            values.name.length == 0 ||
            values.email.length == 0 ||
            values.lastName.length == 0 ||
            values.password.length == 0
        ) {
            showError('Preencha os campos corretamente!')
            return
        }

        const url = `/users/${dataUser.id}`

        await fetchData.put(url, values)
            .then(response => console.log(response))
            .catch(err => console.log(err))

        setDataUser(values)

        setIsEditing(false)

        setShowAlertSucess(true)

        setTimeout(() => {
            setShowAlertSucess(false)
        }, 5000)



    }

    const onChange = (e) => {
        setShowAlertError(false)

        const { name, value } = e.target
        let newValues = { ...values }
        console.log(newValues)
        newValues[name] = value

        setValues(newValues)
    }

    return (
        <Main>
            <h1>Bem-vindo(a) {dataUser.name}!</h1>

            <Stack direction='column' align='center' mt='30px'>
                <Avatar size='2xl' name={dataUser.name + dataUser.lastName} />


                <Stack mt='35px' w='90%'>

                    <h5>Dados do usuário</h5>

                    <Input isDisabled={isEditing ? false : true} variant='filled' name='name' value={values.name} onChange={onChange} />

                    <Input isDisabled={isEditing ? false : true} variant='filled' name='lastName' value={values.lastName} onChange={onChange} />

                    <Input isDisabled={isEditing ? false : true} variant='filled' name='email' value={values.email} onChange={onChange} />

                    <Input isDisabled={isEditing ? false : true} type='password' name='password' variant='filled' value={values.password} onChange={onChange} />
                </Stack>

                <Stack direction='row' justify='space-between' w='90%' mt='35px'>


                    {isEditing ? (
                        <>
                            <ButtonChakra onClick={() => {
                                setValues(dataUser)
                                setIsEditing(false)
                            }} colorScheme='blue'>Cancelar</ButtonChakra>

                            <ButtonChakra colorScheme='blue' onClick={saveChanges}>Salvar Alterações</ButtonChakra>
                        </>
                    ) : (
                        <>
                            <ButtonChakra onClick={() => setIsEditing(true)} colorScheme='blue'>Editar Dados</ButtonChakra>

                            <ButtonChakra onClick={logout} colorScheme='red'>Sair</ButtonChakra>
                        </>

                    )}
                </Stack>


                {showAlertError && (
                    <Alert status='error'>
                        {messageError}
                    </Alert>
                )}

                {showAlertSucess && (
                    <Alert status='success' display='flex'>
                        <IconCheck />
                        Dados alterados com sucesso!
                    </Alert>
                )}

            </Stack>

        </Main>
    );
}

export default Profile;