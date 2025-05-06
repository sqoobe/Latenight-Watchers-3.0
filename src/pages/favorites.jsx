import React from 'react';
import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/movieCard';

export default function Favorites() {
  const { favorites, sortMovies } = useMovieContext();
  const sortedFavorites = sortMovies(favorites);

  return (
    <div className="container">
      <h1>My Favorites</h1>
      {favorites.length > 0 ? (
        <div className="card-list">
          {favorites.map(movie => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <div className="empty-favorites">
          No favorite movies yet. Add some from the search page!
        </div>
      )}
    </div>
  );
} 