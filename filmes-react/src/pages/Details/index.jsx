import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { FaStar, FaArrowLeft } from 'react-icons/fa';

import key from "../../api/key";
import styled from 'styled-components';

import Loader from "../../components/Loader";
import InfoDetail from "../../components/InfoDetail";

const ConteinerDetails = styled.div`
    max-width: 600px;
    margin: 40px auto;

    border-radius: 10px;

    padding: 25px;

    background-color: ${({ theme }) => theme.COLORS.bg_color_header};

    display: flex;
    flex-direction: column;
    gap: 20px;

    @media screen and (max-width:600px){
        width: 90%;

        overflow-x: auto;
    }

    >.arrow-left > svg{
        transform: scale(1.2);
        color:${({theme}) => theme.COLORS.primary_color};
    }

    >img{
        display:block;
        border-radius: 10px;
    }

    >.conteiner-info{
        display:flex;
        flex-direction:column;
        gap:20px;
    }

    .title-movie{
        font-size: 1.8rem;
        text-align: center;
    }

    >.overview{
        color: ${({theme}) => theme.COLORS.txt_color};
        opacity:0.8;
        font-size: 1.2rem;
        line-height: 1.7rem;

        >h4{
            font-size: 2rem;
            text-align: center;
            margin-bottom: 25px;
            position : relative;
        }

        >h4:before{
            content: '';
            background-color: ${({theme}) => theme.COLORS.primary_color};
            width: 100%;
            height: 3px;
            position: absolute;
            bottom: -10px;
            left:0;
        }
    }


    
`;

function Details() {
    const [dataMovie, setDataMovie] = useState(null);

    const { id } = useParams();

    const getData = async (url) => {
        let resp = await fetch(url, key);
        let data = await resp.json();

        setDataMovie(data);
    };

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-br`;

        getData(url);
    }, [id]);

    const imageUrl = 'https://image.tmdb.org/t/p/w500';

    return (
        <ConteinerDetails>
            {dataMovie ? (
                <>
                    <Link className="arrow-left" to="/">
                        <FaArrowLeft />
                    </Link>
                    {dataMovie.backdrop_path &&
                      <img src={`${imageUrl}${dataMovie.backdrop_path}`} alt={`Cartaz do ${dataMovie.title}`} />
                    }
                   

                    <div className="conteiner-info">
                        <h3 className="title-movie">{dataMovie.title}</h3>

                        <InfoDetail detail="Avaliação: ">
                            <p>
                                {dataMovie.vote_average.toFixed(1)}
                                <FaStar className="star" />
                            </p>
                        </InfoDetail>

                        <InfoDetail detail="Data de lançamento: ">
                            {dataMovie.release_date.split('-').reverse().join('/')}
                        </InfoDetail>

                        <InfoDetail detail="Gêneros: ">
                            {dataMovie.genres.map((genre, index, array) => {
                                return (
                                    index == array.length - 1 ? <span key={genre.name}>{genre.name}</span> : (
                                        <span key={genre.name}>{genre.name} - </span>
                                    )
                                );
                            })}
                        </InfoDetail>

                        {dataMovie.budget || dataMovie.revenue ? (
                            <>

                                <InfoDetail detail="Orçamento: ">
                                    {dataMovie.budget.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                                </InfoDetail>

                                <InfoDetail detail="Receita: ">
                                    {dataMovie.revenue.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                                </InfoDetail>
                            </>

                        ) : (
                            false
                        )}
                    </div>

                    <div className="overview">
                        <h4>Descrição</h4>
                        {dataMovie.overview}
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </ConteinerDetails>
    );
}

export default Details;
