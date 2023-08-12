import styled from 'styled-components'

const Content = styled.span`
    color: ${({theme}) => theme.COLORS.gray};
    font-size: 1.5rem;
`


function Today() {
    let today = new Date()

    let weekDay = today.getDay()

    switch (weekDay){
        case 1:
            weekDay='Segunda-feira'
            break
        case 2:
            weekDay='Terça-feira'
            break
        case 3:
            weekDay='Quarta-feira'
            break
        case 4:
            weekDay='Quinta-feira'
            break
        case 5:
            weekDay='Sexta-feira'
            break
        case 6:
            weekDay='Sábado'
            break
        case 7:
            weekDay='Domingo'
            break

    }

    let day = today.getDate()
    let month = today.getMonth() + 1

    switch (month){
        case 1:
            month="janeiro"
            break
        case 2:
            month="fevereiro"
            break
        case 3:
            month="março"
            break
        case 4:
            month="abril"
            break
        case 5:
            month="maio"
            break
        case 6:
            month="junho"
            break
        case 7:
            month="julho"
            break
        case 8:
            month="agosto"
            break
        case 9:
            month="setembro"
            break
        case 10:
            month="outubro"
            break
        case 11:
            month="novembro"
            break
        case 12:
            month="dezembro"
            break
        
    }

    return ( 
        <Content>
            {weekDay}, {day} de {month}
        </Content>
     );
}

export default Today;