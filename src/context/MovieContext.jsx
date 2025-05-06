import React, { createContext, useState, useContext, useEffect } from 'react';

// API key from environment variable
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'a-z', 'z-a'
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    const savedWatchlist = localStorage.getItem('watchlist');
    const savedSortBy = localStorage.getItem('sortBy');

    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedWatchlist) setWatchlist(JSON.parse(savedWatchlist));
    if (savedSortBy) setSortBy(savedSortBy);
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    localStorage.setItem('sortBy', sortBy);
  }, [favorites, watchlist, sortBy]);

  const searchMovies = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
      const res = await fetch(url);
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error(err);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addToFavorites = (movie) => {
    if (!favorites.some(fav => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (movieId) => {
    setFavorites(favorites.filter(movie => movie.id !== movieId));
  };

  const addToWatchlist = (movie) => {
    if (!watchlist.some(watch => watch.id === movie.id)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist(watchlist.filter(movie => movie.id !== movieId));
  };

  const sortMovies = (movies) => {
    switch (sortBy) {
      case 'newest':
        return [...movies].sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
      case 'oldest':
        return [...movies].sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
      case 'a-z':
        return [...movies].sort((a, b) => a.title.localeCompare(b.title));
      case 'z-a':
        return [...movies].sort((a, b) => b.title.localeCompare(a.title));
      default:
        return movies;
    }
  };

  return (
    <MovieContext.Provider value={{
      favorites,
      watchlist,
      searchResults,
      isLoading,
      addToFavorites,
      removeFromFavorites,
      addToWatchlist,
      removeFromWatchlist,
      sortBy,
      setSortBy,
      sortMovies,
      searchMovies
    }}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovieContext() {
  return useContext(MovieContext);
} 