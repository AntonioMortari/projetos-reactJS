import {useNavigate} from 'react-router-dom'
import { useState } from 'react';

import axios from 'axios';

import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { AiOutlineArrowLeft } from 'react-icons/ai'
import Main from "../../components/ConteinerMain";
import Button from '../../components/Button';

const ConteinerAddTask = styled.div`
    >.come-back{
        font-size: 1rem;
        color: ${({ theme }) => theme.COLORS.gray};
    }

    >h2{
        text-align:center;
        color:${({ theme }) => theme.COLORS.blue};
    }

    >.info-task{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 20px;

        margin-top: 20px;

        >label{
            display: flex;
            flex-direction: column;

            >input{
                padding: 0 5px;
                border: none;
                outline: none;

                font-size: 1rem;

                border-bottom: 2px solid ${({ theme }) => theme.COLORS.gray};

                transition: .3s;

                &:focus{
                    border-color:${({ theme }) => theme.COLORS.blue};
                }
            }
        }

        >#description-task{
            resize: none;
            border: 2px solid ${({ theme }) => theme.COLORS.gray} ;
            border-radius: 5px;

            padding: 5px;

            outline: none;

            transition: .3s;

            &:focus{
                border-color: ${({ theme }) => theme.COLORS.blue};
            }
        }

    }
`



function AddTask() {
    // estados do input e textarea
    const [nameTask, setNameTask] = useState('')
    const [description, setDescription] = useState('')

    const navigate = useNavigate()

    const addTaskDB = async() =>{
        // função que adiociona uma tarefa ao db pegando os dados do input e checkbox
        const newTask = {
            nameTask:nameTask,
            description:description,
            isCompleted:false
        }

        try{
            let resp = await axios.post('http://localhost:3000/tasks',newTask)
            console.log(resp)
        }catch(err){
            console.log(err)
        }

        // volta para página inicial
        navigate('/')

    }

    return (
        <Main>
            <ConteinerAddTask>

                <Link to="/" className='come-back'>
                    <AiOutlineArrowLeft />
                </Link>

                <h2>Adicionar nova tarefa</h2>

                <div className="info-task">

                    <label htmlFor="input-name-task">
                        <input
                            type="text"
                            id="input-name-task"
                            name='input-name-task'
                            placeholder='Digite o nome da tarefa'
                            size={20}
                            value={nameTask}
                            onChange={(e) =>{
                                setNameTask(e.target.value)
                            }} />
                    </label>

                    <textarea name="description-task" id="description-task" cols="30" rows="3" value={description} placeholder='Digite uma descrição para a tarefa' onChange={(e) =>{
                        // atualiza a variável description ao digitar
                        setDescription(e.target.value)
                    }}></textarea>
                </div>

                <Button content='Adicionar Tarefa' onClick={() => {
                    // só adiciona a tarefa se houver dados no input
                    nameTask && addTaskDB()
                }}/>

            </ConteinerAddTask>
        </Main>
    );
}

export default AddTask;