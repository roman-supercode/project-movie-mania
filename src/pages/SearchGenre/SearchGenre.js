import './SearchGenre.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GenreCard from '../../components/GenreCard/GenreCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import GenreButton from '../../components/GenreButtons/GenreButtons';

function SearchGenre({ addToFavorites, dataBaseFavs }) {
    // URL- Parameter auslesen
    const params = useParams();
    const [movieData, setMovieData] = useState();

    // Sortiert die Filme nach ihrer Bewertung in aufsteigender Reihenfolge
    function SortAscending() {
        const copyMovieData = [...movieData];
        setMovieData(copyMovieData.sort((a, b) => b.vote_average - a.vote_average));
    }

    // Sortiert die Filme nach ihrer Bewertung in absteigender Reihenfolge
    function SortDescending() {
        const copyMovieData = [...movieData];
        setMovieData(copyMovieData.sort((a, b) => a.vote_average - b.vote_average));
    }


    useEffect(() => {
        // Falls searchValue nicht definiert ist, wird die Funktion beendet
        if (params.searchValue === undefined) {
            return;
        }
        // Filme werden basierend auf dem Suchbegriff abgerufen
        if (params.variant === "search") {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=de-DE&query=${params.searchValue}&include_adult=false`)
                .then(response => response.json())
                .then(data => {
                    setMovieData(data.results);
                });
        }
        // Filme werden basierend auf dem Genre abgerufen
        if (params.variant === "genre") {
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${params.searchValue}`)
                .then(response => response.json())
                .then(data => {
                    setMovieData(data.results);
                });
        }
        // Trendfilme der Woche werden abgerufen
        if (params.variant === "trending") {
            fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}&language=de-DE`)
                .then(response => response.json())
                .then(data => {
                    setMovieData(data.results);
                });
        }
    }, [params]);

    // Falls movieData nicht definiert ist, wird die Funktion beendet
    if (movieData === undefined) return;

    return (
        <section className='SearchGenre-Wrapper'>
            <SearchBar />
            <GenreButton />
            <div className='sortBtnDiv'>
                <button className='sortBtn' type='button' onClick={SortAscending}>Sort by popularity ↓</button>
                <button className='sortBtn' type='button' onClick={SortDescending}>Sort by popularity ↑</button>
            </div>

            {movieData.map((singleMovieData, index) => {
                // Falls dataBaseFavs nicht definiert ist, wird die Funktion beendet
                if (dataBaseFavs === undefined) return;
                // Es wird überprüft, ob der aktuelle Film in dataBaseFavs vorhanden ist
                dataBaseFavs.forEach((el) => {
                    // Falls der Film in dataBaseFavs vorhanden ist, wird das Fav-Attribut auf "true" gesetzt
                    if (el.id === singleMovieData.id) {
                        singleMovieData.fav = true;
                    }
                });

                return (
                    <GenreCard addToFavorites={addToFavorites} data={singleMovieData} index={index} dataBaseFavs={dataBaseFavs} />
                );
            })}
        </section>
    );
}

export default SearchGenre;