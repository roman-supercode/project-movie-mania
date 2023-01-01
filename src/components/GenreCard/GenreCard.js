// IMPORT - CSS & ASSETS
import './GenreCard.css';
import Star from '../../assets/img/RatingStar.svg';
import Placeholder from '../../assets/img/Placeholder.png';
import BookmarkSymbol from "../../assets/img/BookmarkIcon.png";
import AddToFav from '../../assets/icons/AddToFav.svg';
import AddedToFav from '../../assets/icons/AddedToFav.svg';
// IMPORT - DATA & REACT ELEMENTS
import GenreList from './GenreList.json';
import { Link } from 'react-router-dom';

// Diese Funktion gibt eine Komponente mit Informationen über einen Film zurück
function GenreCard({ data, index, addToFavorites, page, delteItem, dataBaseFavs }) {
    const date = new Date(data.release_date);
    let genre;

    // Diese Funktion bestimmt das Genre des Films und speichert es in der genre-Variable
    function getGenres() {
        // Wenn das data-Objekt kein genres-Array hat, verwende das genre_ids-Array, um das Genre zu bestimmen
        if (data.genres === undefined) {
            genre = GenreList.genres.find((genre) => genre.id === data.genre_ids[0]);

            // Wenn das data-Objekt ein genres-Array hat, verwende dieses Array, um das Genre zu bestimmen
        } else if (!data.genres === undefined) {
            genre = GenreList.genres.find((genre) => genre.id === data.genres[0].id);
        }
    };
    // Rufe die getGenres-Funktion auf, um das Genre des Films zu bestimmen
    getGenres();

    // Gib ein section-Element mit Informationen über den Film und Interaktionsschaltflächen zurück
    return (
        <section key={index} className="genreCard">
            <Link className="genreCardLink" to={`/details/${data.id}/${data.original_title}`}>
                <img className="genreCard-poster" src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`} onError={(e) => { e.onerror = null; e.target.src = Placeholder; }} alt={data.originale_title}></img>
                <section className="genreCard-information">
                    <article className="genreCard-movieTitle">
                        <h3 className="genreCard-title">{data.original_title}</h3>
                        <article>
                            <img className="starImg" alt="star" src={Star}></img>
                            <p className="genreCard-rating">{data.vote_average.toFixed(1)}</p>
                        </article>
                    </article>
                    <article className="genreCard-movieText">
                        <p className="genreCard-releaseYear">{date.getFullYear()} &nbsp;  {genre?.name}</p>
                    </article>
                </section>
            </Link>
            <article className='genreCard-interactionButtons'>
                <img alt="Bookmarksybmol" onClick={(e) => {
                    if (data.fav) {
                        delteItem(data.docid);
                    } else {
                        addToFavorites(data); e.target.src = AddedToFav;
                    }
                }} className="genreCard-bookmark" src={data.fav ? AddedToFav : AddToFav}></img>
            </article>
        </section>
    );
}

export default GenreCard;