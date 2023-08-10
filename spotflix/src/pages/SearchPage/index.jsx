import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import ConteinerMovies from "../../components/ConteinerMovies";
import Msg from '../../components/Msg'
import CardMovie from "../../components/CardMovie";
import PageNavigation from '../../components/PageNavigation'

import key from "../../api/key";

function SearchPage() {
    let { value } = useParams();
    let [dataMovies, setDataMovies] = useState([]);
    let [page, setPage] = useState(1)
    const getData = async (url) => {
        let resp = await fetch(url, key);
        let data = await resp.json();

        setDataMovies(data.results);
    };

    useEffect(() => {
        let url = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=pt-br&page=${page}`;

        getData(url);
    }, [value,page]);

    return (
        <>
            {dataMovies.length > 0 ? (
                <>
                <Msg content="Resultados para" span={`"${value}"`} />
                <ConteinerMovies>
                    {dataMovies.map((movie) =>
                        movie.poster_path && <CardMovie key={movie.id} data={movie} />
                    )}
                </ConteinerMovies>

                        
                {dataMovies.length == 20 &&(
                    <PageNavigation page={page} statePage={setPage} />
                )}
                </>
            ) : (
                <Msg content="Sem resultados para" span={`"${value}"`}/>
            )}

        </>
    );
}

export default SearchPage;
