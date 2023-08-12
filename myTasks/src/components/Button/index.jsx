import styled from 'styled-components'

const Button = styled.button`
        display: block;
        padding: 5px;
        margin: 0 auto;
        margin-top: 20px;

        background-color: ${({theme}) => theme.COLORS.blue};
        color:${({theme}) => theme.COLORS.white};
        border: none;
        border-radius: 5px;

        transition: .2s;

        &:hover{
            filter: brightness(85%)
        }
`


function ComponentButton({content, onClick}) {
    // botão que recebe o conteúdo e o evento ao clicar
    return (
        <Button onClick={onClick}>
            {content}
        </Button>
     );
}

export default ComponentButton;