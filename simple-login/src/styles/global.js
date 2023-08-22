import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
    }

    body{
        min-height: 100vh;
    }

    button{
        cursor: pointer;
        border: none;
    }

    input{
        border: none;
    }

    a{
        text-decoration: none;
    }
`