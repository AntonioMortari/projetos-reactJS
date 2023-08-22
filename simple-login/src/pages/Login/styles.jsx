import styled from 'styled-components'

const Conteiner = styled.main`
    background-color: ${({theme}) => theme.colors.bgmain};

    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 12px #26262665;

    >h1{
        color: ${({theme}) => theme.colors.primary};
        font-weight: normal;
    }

    a{
        color: #f6f6f6;
    }

    >p{
        color: #262626a6;

        &:last-child{
            margin-top: 10px;
        }

        >a{
            margin-top: 20px;
            color: ${({theme}) => theme.colors.primary};
            
            &:hover{
                text-decoration: underline;
            }

        }
    }
`

export default Conteiner