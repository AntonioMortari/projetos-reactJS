import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import fetchData from '../../axios/config'

import Main from '../../components/Main'

import {
    Avatar,
    Stack,
    Input,
    Heading,
    Button as ButtonChakra
} from '@chakra-ui/react'

function Profile() {
    const [dataUser, setDataUser] = useState([])
    const isLogged = useSelector(state => state.isLogged)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getDataUser = async(idUser) =>{
        const url = `/users/${idUser}`
        fetchData.get(url)
            .then(response => {
                setDataUser(response.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() =>{
        if(isLogged){
            const idUser = JSON.parse(localStorage.getItem('user'))
            getDataUser(idUser)
        }else{
            navigate('/')
        }
    },[])

    const logout = () =>{
        localStorage.removeItem("user")
        dispatch({type:'LOGOUT'})
        navigate('/')
    }

    return ( 
        <Main>
            <h1>Bem-vindo(a) {dataUser.name}!</h1>

            <Stack direction='column' align='center' mt='30px'>
                <Avatar size='2xl' name={dataUser.name + dataUser.lastName} />

            
                <Stack mt='35px' w='90%'>
                    <h5>Dados do usuário</h5>
                    <Input isDisabled variant='filled' value={dataUser.name + " " + dataUser.lastName} />
                    <Input isDisabled variant='filled' value={dataUser.email} />
                    <Input isDisabled type='password' variant='filled' value={dataUser.password} />
                </Stack>
                
                <Stack direction='row' justify='space-between' w='90%' mt='35px'>
                    <ButtonChakra colorScheme='blue'>Alterar Dados</ButtonChakra>
                    <ButtonChakra onClick={logout} colorScheme='red'>Sair</ButtonChakra>
                </Stack>
            </Stack>

        </Main>
     );
}

export default Profile;