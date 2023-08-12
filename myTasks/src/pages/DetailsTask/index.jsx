import axios from 'axios'

import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'

import styled from 'styled-components'

import ConteinerMain from '../../components/ConteinerMain'

import {AiOutlineArrowLeft} from 'react-icons/ai'

const ConteinerDetails = styled.div`
    >a > svg{
        color: ${({theme}) => theme.COLORS.gray};
        transform: scale(1.2);
    }

    >h2{
        color: ${({theme}) => theme.COLORS.blue};
        font-size: 2rem;
        border-bottom: 1px solid ${({theme}) => theme.COLORS.gray_light};

        margin-bottom: 20px;
    }

    >.conteiner-description{
        >span{
            font-size: 1.5rem;
        }

        >p{
            margin-top: 10px;
            color: ${({theme}) => theme.COLORS.gray};
            font-size: 1.2rem;
        }
    }
`





function DateailsTask() {
    const {id} = useParams()
    const [dataTask, setDataTask] = useState([])

    const getDataTask = async() =>{
        let resp = await axios.get(`http://localhost:3000/tasks/${id}`)
        setDataTask(resp.data)
    }

    useEffect(() => {
        getDataTask()
    },[])

    return ( 
        <ConteinerMain>

            <ConteinerDetails>
                <Link to="/">
                    <AiOutlineArrowLeft />
                </Link>
                <h2>{dataTask.nameTask}</h2>
                <div className='conteiner-description'>
                    <span>Descrição:</span>
                    <p>{dataTask.description}</p>
                </div>
            </ConteinerDetails>

        </ConteinerMain>
     );
}

export default DateailsTask;