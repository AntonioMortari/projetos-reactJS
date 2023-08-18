import axios from 'axios'
import { useEffect,useState } from 'react';

import key from '../../api/key'

import CardMovie from '../../components/CardMovie';
import ConteinerMovies from '../../components/ConteinerMovies'
import Msg from '../../components/Msg'


function Favorites() {
    const [dataMovies, setDataMovies] = useState([])

    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || [] )

    const getDataMovie = async(id) =>{
        let resp = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=pt-br`,key)
        let data = await resp.json()

        setDataMovies(prevDataMovies => [...prevDataMovies, data])
    }

    useEffect(() =>{
        let newFavorites;
        axios.get('http://localhost:3000/favorites')
            .then(response => {
                newFavorites = [...response.data]
                setFavorites(newFavorites)

                newFavorites.map(obj => {
                    getDataMovie(obj.id)
                })
                
            })
            .catch(err => console.log(err))
           
    },[])

    

    return (
        <>
            <Msg content="Meus" span="Favoritos" />

            <ConteinerMovies>
                {dataMovies.length > 0  ? (
                    dataMovies.map((movie,index) => (
                        <CardMovie data={movie} key = {index} />
                    ))
                ) : (
                    <Msg content = "Você ainda não favoritou nenhum filme!" />
                )}
            </ConteinerMovies>
        </> 
     );
}

export default Favorites;