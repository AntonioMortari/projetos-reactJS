import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaStar, FaRegHeart, FaHeart, FaTrash } from 'react-icons/fa'

import dataFavorites from '../../../db.json'
let idFavorites = dataFavorites.favorites
let arrayIds = idFavorites.map(obj => {
    return (
        obj.id
    )
})


import { Link } from 'react-router-dom'

const Card = styled.div`
    transform: scale(.95);
        width: 280px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;


        padding: 12px;

        background-color: ${({ theme }) => theme.COLORS.bg_color_header};

        border-radius: 10px;

        >img{
            display: block;
            border-radius: 10px;
            margin-bottom: 5px;
            height: 80%;
        }

        >.info-movie{
            display: flex;
            flex-direction: column;
            gap: 15px;

            >h2{
                font-size: 1.5rem;
                text-align: center;
            }
            
            >p{
                display: flex;
                align-items: center;
                justify-content: space-between;

                font-size: 1.1rem;
            }

            >p p:first-child{
                display: flex;
                gap: 5px;

                >.star{
                    color: #ebeb0b;
                }
            }

            >.action{
                display: flex;
                justify-content: space-between;
                align-items: center;

                padding: 10px;

                margin-top: 10px;

                >svg{
                    transform: scale(1.2);
                    color: ${({ theme }) => theme.COLORS.primary_color};
                    cursor: pointer;

                    transition: .3s;
                }

                >svg:hover{
                    transform: scale(1.3);
                }
            }

            >.action a{
                width: 20%;
                color: ${({ theme }) => theme.COLORS.primary_color};
                font-weight: bold;

                transition: .2s;
            }

            a:hover{
                color: ${({ theme }) => theme.COLORS.bg_color};
            }

            
        }
    `


function CardMovie({ data }) {
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || [] )

    const addFavorites = (id) => {
        if (!favorites.includes(id)) {
            const newFavorites = [...favorites, id];
            setFavorites(newFavorites);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        }
    };

    const removeFavorites = (id) =>{
        const indexToRemove = favorites.indexOf(id)

        if (indexToRemove !== -1) {
            //se encontrar
            const newFavorites = [...favorites]
            newFavorites.splice(indexToRemove, 1)
    
            setFavorites(newFavorites)
            localStorage.setItem('favorites', JSON.stringify(newFavorites))
        }
        
    }

    const imageUrl = 'https://image.tmdb.org/t/p/w500'
    let date = data.release_date.split('-')
    date = date[0]
    return (
        <Card key={data.id} id={data.id}>
            <img src={`${imageUrl}${data.poster_path}`} alt={`Cartaz do ${data.title}`} />

            <div className='info-movie'>
                <h2>{data.title}</h2>

                <p>
                    <p>
                        <FaStar className='star' />
                        {data.vote_average.toFixed(1)}
                    </p>

                    {date}
                </p>

                <div className='action'>
                    <Link to={`/movies/${data.id}`}>
                        Detalhes
                    </Link>


                    {favorites.includes(data.id) ? (
                        <FaHeart onClick={() =>{
                            removeFavorites(data.id)
                        }} />
                    ) : (
                        <FaRegHeart onClick={() =>{
                            addFavorites(data.id)
                        }} />
                    )}

                </div>
            </div>
        </Card>
    );
}

export default CardMovie;