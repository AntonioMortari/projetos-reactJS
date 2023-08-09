import styled from 'styled-components'

const H2 = styled.h2`
    color: ${({theme}) => theme.COLORS.txt_color};
    font-size: 3rem;
    position:absolute;
    top: 50%;
    left: 30%;
`

function NotFound() {
    return ( 
        <H2>Página não encontrada :{'('}</H2>
     );
}

export default NotFound;