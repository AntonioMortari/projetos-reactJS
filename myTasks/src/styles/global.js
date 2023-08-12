import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`
    *{
        padding:0;
        margin: 0;
        box-sizing: border-box;
        font-family: 'Poppins';
    }

    *::selection{
        background-color: ${({theme}) => theme.COLORS.blue};
        color: ${({theme}) => theme.COLORS.white};
    }

    body{
        min-height: 100vh;
        display: grid;
        place-content: center;

        background-color: ${({theme}) => theme.COLORS.blue};
    }

    button,svg{
        cursor: pointer;
    }
`