import styled from 'styled-components'

const P = styled.p`
    text-align: center;
    margin-top: 50px;
    font-size: 3rem;

    >span{
        color:${({theme}) => theme.COLORS.primary_color};
        font-weight: bold;
    }
`

function Msg({content, span}) {
    return ( 
        <P>
            {content} <span>{span}</span>
        </P>
     );
}

export default Msg;