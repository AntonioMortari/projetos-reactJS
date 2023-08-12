import {useState, useEffect} from 'react'

import {Link} from 'react-router-dom'

import { AiOutlinePlus } from 'react-icons/ai'
import Today from '../../components/Today'
import ButtonAddTask from '../../components/ButtonAddTask'
import Task from '../../components/Task'

import ConteinerTasks from '../../components/ConteinerTasks'
import Main from '../../components/ConteinerMain'


function Home() {
    const [dataTasks, setDataTasks] = useState([])

    const getDataTasks = async() =>{
        let resp = await fetch('http://localhost:3000/tasks')
        let data = await resp.json()

        // atualiza a variável dataTasks com os dados do db
        setDataTasks(data)
    }

    useEffect(() => {
        // pega os dados do db uma vez
        getDataTasks()
    },[])

    return (
        <Main>
            <div className='action'>
                <div>
                    <Today />

                    <Link to="addTask">
                        <ButtonAddTask >
                            <AiOutlinePlus />
                        </ButtonAddTask>
                    </Link>
                </div>

                {dataTasks.length > 0 && <span className='number-task'>{dataTasks.length} tarefas</span>}

                <ConteinerTasks>

                    {dataTasks.length > 0 ? (
                        dataTasks.map((task) =>{
                            return(
                                // renderiza todas as tarefas do db
                                <Task nameTask={task.nameTask} id={task.id} isCompleted={task.isCompleted} key={task.id} />
                            )
                        })
                    ) : (
                        // se não houver tarefas, renderize o h2
                        <h2>Suas tarefas aparecerão aqui!</h2>
                    )}

                </ConteinerTasks>
            </div>

        </Main>
    );
}

export default Home;