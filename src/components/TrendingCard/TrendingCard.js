// IMPORT - CSS & ASSETS
import './TrendingCard.css';
import star from '../../assets/img/RatingStar.svg';
// IMPORT - REACT ELEMENTS
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function TrendingCard() {
    const DELAY = 3500; // Intervallzeit zwischen den Bildern im Slideshow
    // Nutze die useState-Hook von React, um die Trending-Daten und den aktuellen Index für den Slideshow zu verwalten
    const [trendingData, setTrendingData] = useState();
    const [index, setIndex] = useState(0);
    // Erstelle einen Referenz für das Timeout
    const timeoutRef = useRef(null);

    // Abruf von Daten beim ersten Render Vorgang
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}&language=de-DE`)
            .then(response => response.json())
            .then((data) => {
                setTrendingData(data.results.slice(0, 5));
            });
    }, []);

    // Lösche die Timeouts
    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    // Nutze die useEffect-Hook von React, um ein Timeout zu setzen, das den aktuellen Index für den Slideshow ändert
    useEffect(() => {
        // Wenn die Trending-Daten noch nicht geladen sind, abbrechen
        if (trendingData === undefined) {
            return;
        }
        // Lösche das aktuelle Timeout
        resetTimeout();

        // Setze ein neues Timeout, das den aktuellen Index für den Slideshow ändert
        timeoutRef.current = setTimeout(
            () => setIndex((prevIndex) => {
                prevIndex === trendingData.length - 1 ? 0 : prevIndex + 1;
            }),
            DELAY
        );

        // Gib die Funktion zum Löschen des Timeouts zurück, um sie im Cleanup von useEffect aufzurufen
        return () => {
            resetTimeout();
        };
    }, [index, trendingData]);

    // Wenn die Trending-Daten noch nicht geladen sind, abbrechen
    if (trendingData === undefined) {
        return;
    }

    return (
        <section className='trendingCard-wrapper'>
            <h2 className='trendingCard-headline'>Trending Movies <Link to="/discover/trending/movie">See all</Link></h2>
            <div className="trendingCard-slideshow">
                <div
                    className="trendingCard-slideshowSlider"
                    style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
                >
                    {trendingData.map((data, index) => (
                        <Link to={`/details/${data.id}/${data.title}`}
                            className="trendingCard-slide"
                            key={index}
                            style={{
                                background: `url(https://image.tmdb.org/t/p/w400/${data.poster_path})`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover"
                            }}
                        >
                            <div className='trendingCard-TextContent'>
                                <h3>{data.title === undefined ? data.name : data.title}({data.media_type})</h3>
                                {/* Anzeige des durchschnittlichen Bewertungswerts mit einem Komma als Dezimaltrennzeichen */}
                                <p><img src={star} alt="RatingStar"></img>{(data.vote_average).toFixed(1)} / 10.0</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="trendingCard-slideshowDots">
                    {trendingData.map((_, idx) => (
                        <div
                            key={idx}
                            className={`trendingCard-slideshowDot${index === idx ? " active" : ""}`}
                            onClick={() => {
                                setIndex(idx);
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TrendingCard;

