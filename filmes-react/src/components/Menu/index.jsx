import styled from 'styled-components'
import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Header = styled.header`
    background-color: ${({theme}) => theme.COLORS.bg_color_header};

    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;

    padding: 15px 5%;

    @media screen and (max-width:490px){
        padding: 15px;

        margin-bottom: 150px;

        justify-content: space-around;

        >label{
            position: absolute;
            top: 120px;
            left: 15%;

            height: 40px;

            transform: scale(1.4);
        }
    }

    >h1 a{
        color: ${({theme}) => theme.COLORS.primary_color};
        text-transform: uppercase;
        font-size: 1.8rem;
    }

    >label{
        display: flex;
        height: 40px;
        >button{
            background-color: ${({theme}) => theme.COLORS.primary_color};
            padding: 10px;
            border: none;
            outline: none;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;

            transition: .2s;
        }

        >button:hover{
            background-color: ${({theme}) => theme.COLORS.bg_color_header};
        }

        >button svg:hover{
            color: ${({theme}) => theme.COLORS.primary_color};
        }

        >input{
            padding: 10px;
            border: none;
            outline: none;
            color: ${({theme}) => theme.COLORS.bg_color};

            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
        }

        >input:focus{
            outline: 1px solid ${({theme}) => theme.COLORS.primary_color};
        }
    }

    >a{
        color:  ${({theme}) => theme.COLORS.txt_color};
        font-weight: bold;

        position: relative;

        &::before{
            content: '';

            position: absolute;
            bottom: -10px;
            left: 0;

            width: 0%;
            height: 2px;
            background-color: ${({theme}) => theme.COLORS.primary_color};
            transition: all.3s;

        }

        &:hover::before{
            width: 100%;
        }
    }

`

function Menu() {
    const navigate = useNavigate()
    
    return ( 
        <Header>
        <h1><Link to="/">SpotFlix</Link></h1>

        <label htmlFor="search-movie">
            <button onClick={() =>{
                let inputValue = document.getElementById('input-search-movie')

                if(!inputValue.value){
                    return
                }
                
                navigate(`/movies/search/${inputValue.value}`)
                inputValue.value = ''
            }}>
                <FaSearch />
            </button>
            <input type="text" name="input-search-movie" id="input-search-movie" placeholder='Busque um filme' onKeyDown={(e) =>{
                if(e.key == 'Enter' && e.target.value){
                    navigate(`/movies/search/${e.target.value}`)
                    e.target.value = ''
                }
            }} />
        </label>

        <Link to="/favorites">Meus Favoritos</Link>
      </Header>
     );
}

export default Menu;