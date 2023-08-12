import axios from 'axios'

// hooks
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'

// componentes e icones
import ButtonCheckTask from '../ButtonCheckTask'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import {Link} from 'react-router-dom'

// estilos do conteiner
const Conteiner = styled.div`
    margin-bottom: 25px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    >div{
        display: flex;
        align-items: center;
        gap: 10px;
        position: relative;
        width: 93%;

        &::before{
            content: '';
            width: 100%;
            height: 1px;
            background-color: ${({ theme }) => theme.COLORS.gray_light};
            position: absolute;
            bottom: -3px;
            left: 30px;
        }

        >a{
            width: 100%;
            color: ${({theme}) => theme.COLORS.gray};
            text-decoration: none;

            padding: 1px 5px;
            border-radius: 5px;

            transition: .2s;

            &:hover{
                background-color: ${({theme}) => theme.COLORS.gray_light};
            }
        }
    }

    >abbr > button{
        background-color: transparent;
        border: none;
    }

    >abbr > button > svg{
        color: ${({theme}) => theme.COLORS.blue};
        transform: scale(1.5);
    }

    
`

function Task({ nameTask, id, isCompleted  }) {
    // estado do checkbox, que começa com o status da tarefa do db
    const [checked, setChecked] = useState(isCompleted)

    const navigate = useNavigate()

    // função de deletar a tarefa
    const deleteTaskDB = async(id) =>{
        try{
            let resp = await axios.delete(`http://localhost:3000/tasks/${id}`)
            console.log(resp)
        }catch(err){
            console.log(err)
        }
        
    }

    const getTasks = async() =>{
        try{
            let resp = await axios.get('http://localhost:3000/tasks')
            return resp.data
        }catch(err){
            console.log(err)
        }
    }

    const updatedTask = async(id,isChecked) =>{
        // pega as todas as tarefas do db
        let tasks = await getTasks()

        // encontra a tarefa que tem o id da tarefa marcada e atualiza o status de acordo com o estado do checkbox, que foi passado como parâmetro
        const updatedTask = tasks.find(task => task.id === id);
        updatedTask.isCompleted = isChecked;

        try{
            // atualiza o db com o status novo
            let resp = await axios.put(`http://localhost:3000/tasks/${id}`, updatedTask)
            console.log(resp)
            
        }catch(err){
            console.log(err)
        }
    } 

    return (
        <Conteiner>
            <div>
                <ButtonCheckTask checked={checked} onChange={(e) => {
                    const isChecked = e.target.checked
                    setChecked(isChecked)

                    updatedTask(id,isChecked)
                    
                }} />

                <Link to={`/tasks/${id}`}><span>{nameTask}</span></Link>
            </div>
            <abbr title="Excluir Tarefa">

                <button onClick={() =>{
                    deleteTaskDB(id)
                }} 
                className='delete-task'>

                    <AiOutlineCloseCircle />
                </button>
            </abbr>
        </Conteiner>
    );
}

export default Task;