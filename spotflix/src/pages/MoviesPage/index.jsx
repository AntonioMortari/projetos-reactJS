import { useState, useEffect } from 'react'
import Loader from '../../components/Loader'

import ConteinerMovies from '../../components/ConteinerMovies/'
import CardMovie from '../../components/CardMovie'
import PageNavigation from '../../components/PageNavigation'


import key from '../../api/key'

function MoviesPage() {
    let [page, setPage] = useState(1)
    let [dataMovies, setDataMovies] = useState([])

    const getData = async (url) => {
        let resp = await fetch(url, key)
        let data = await resp.json()

        setDataMovies(data.results)
    }

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/trending/movie/day?language=pt-br&page=${page}`

        getData(url)

    }, [page])
    return (
        <>
            <ConteinerMovies>
                {dataMovies ? (
                    dataMovies.map(movie => (
                        <CardMovie data={movie} key={movie.id} />
                    ))
                ) : (
                    <Loader />
                )}
            </ConteinerMovies>

            <PageNavigation page={page} statePage={setPage} />

        </>


    );

}

export default MoviesPage;