import styled from 'styled-components'

const Button = styled.button`
    background-color: ${({ theme }) => theme.COLORS.blue};

    >svg{
        color: ${({theme}) => theme.COLORS.white};
        transform: scale(1.8);
    }

    padding: 20px;
    border-radius: 50%;
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: .3s;

    &:hover{
        background-color: ${({theme}) => theme.COLORS.blue_hover};
    }
`

function ComponentButton({ children }) {
    return (
        <Button>
            {children}
        </Button>
    );
}

export default Button;