import React, { useState } from "react";
import MovieCard from "./movieCard";
import { useMovieContext } from "../context/MovieContext";
import angryMeow from '../img/Cat.jpg';

/**
 * SearchMovies - Component for searching movies
 * 
 * This component provides both a main search form and displays search results
 * using the MovieCard components.
 * 
 * @returns {JSX.Element} - Rendered search form and list of movie cards
 */
export default function SearchMovies() {
  const [query, setQuery] = useState('');
  const [showMeow, setShowMeow] = useState(false);
  const { searchResults, isLoading, sortMovies, searchMovies } = useMovieContext();
  const sortedMovies = sortMovies(searchResults);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.toLowerCase() === 'meow') {
      setShowMeow(true);
      setTimeout(() => setShowMeow(false), 3000);
      return;
    }
    await searchMovies(query);
  };

  return (
    <div className="container">
      {showMeow && (
        <div className="meow-container">
          <img src={angryMeow} alt="Angry cat" className="meow-image" />
          <div className="meow-text">MJAU</div>
        </div>
      )}
      
      <form className="form" onSubmit={handleSubmit}>
        <label className="label" htmlFor="query">Movie Name</label>
      <input
        className="input"
        type="text"
        name="query"
        placeholder="i.e. Jurassic Park"
        value={query} 
          onChange={(e) => setQuery(e.target.value)}
      />
        <button className="button" type="submit">Search</button>
    </form>
    
      {isLoading ? (
        <div className="loading">Searching for movies...</div>
      ) : (
        <div className="card-list">
          {sortedMovies.length > 0 ? (
            sortedMovies
              .filter(movie => movie.poster_path)
              .map(movie => (
                <MovieCard movie={movie} key={movie.id} />
              ))
          ) : (
            <div className="no-results">
              {searchResults.length === 0 ? 
                "Enter a movie name and click search!" :
                "No movies found matching your search."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}