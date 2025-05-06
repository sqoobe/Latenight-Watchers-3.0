import React from "react"
import { useMovieContext } from "../context/MovieContext"
import TruncatedDescription from "./TruncatedDescription"

/**
 * MovieCard - Komponent for å vise informasjon om en film
 * 
 * Denne komponenten tar imot et movie-objekt som prop og viser 
 * filmens poster, tittel, utgivelsesdato, vurdering og beskrivelse
 * i et kort-format.
 * 
 * @param {Object} props - Komponentens props
 * @param {Object} props.movie - Filmobjekt med informasjon fra TMDB API
 * @returns {JSX.Element} - Rendret filmkort
 */
export default function MovieCard({movie}) {
    const { 
        favorites, 
        watchlist, 
        addToFavorites, 
        removeFromFavorites, 
        addToWatchlist, 
        removeFromWatchlist 
    } = useMovieContext();

    const { title, poster_path, release_date, vote_average, overview } = movie;
    const isFavorite = favorites.some(fav => fav.id === movie.id);
    const isInWatchlist = watchlist.some(watch => watch.id === movie.id);

    const handleFavoriteClick = () => {
        if (isFavorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    };

    const handleWatchlistClick = () => {
        if (isInWatchlist) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie);
        }
    };

    return (
        <div className="card">
            {/* Filmposter fra TMDB API med w500 størrelse */}
            <img className="card--image"
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={title}
            />
            <div className="card--content">
                {/* Filmtittel */}
                <h3 className="card--title">{title}</h3>
                
                {/* Informasjon om utgivelsesdato */}
                <p className="card--desc">RELEASE DATE: {release_date}</p>
                
                {/* Filmens vurdering basert på stemmer */}
                <p className="card--desc">RATING: {vote_average}</p>
                
                {/* Filmbeskrivelse/sammendrag */}
                <TruncatedDescription text={overview} />
            </div>
            <div className="card--buttons">
                <button onClick={handleFavoriteClick}>
                    {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
                </button>
                <button onClick={handleWatchlistClick}>
                    {isInWatchlist ? '📋 Remove from Watchlist' : '➕ Add to Watchlist'}
                </button>
            </div>
        </div>
    )
}