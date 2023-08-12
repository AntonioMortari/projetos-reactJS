import styled from 'styled-components'

const Conteiner = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;

    >h2{
        color: ${({theme}) => theme.COLORS.gray_light};
        font-weight: normal;
    }
`   

function ConteinerTasks({children}) {
    return ( 
        <Conteiner>
            {children}
        </Conteiner>
     );
}

export default ConteinerTasks;