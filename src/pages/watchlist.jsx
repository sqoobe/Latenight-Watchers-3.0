import React from 'react';
import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/movieCard';

export default function Watchlist() {
  const { watchlist, sortMovies } = useMovieContext();
  const sortedWatchlist = sortMovies(watchlist);

  return (
    <div className="container">
      <h1>My Watchlist</h1>
      {watchlist.length > 0 ? (
        <div className="card-list">
          {watchlist.map(movie => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <div className="empty-watchlist">
          Your watchlist is empty. Add some movies from the search page!
        </div>
      )}
    </div>
  );
} 