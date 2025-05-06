import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useMovieContext } from '../context/MovieContext';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { sortBy, setSortBy, searchMovies } = useMovieContext();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    await searchMovies(query);
    navigate('/'); // Navigate to home page to show results
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            LateNight Watchers
          </Link>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Search
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/favorites" className="nav-link">
                Favorites
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/watchlist" className="nav-link">
                Watchlist
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="navbar-right">
          <form className="navbar-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="navbar-search-input"
            />
            <button type="submit" className="navbar-search-button">
              Search
            </button>
          </form>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="navbar-sort"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="a-z">A to Z</option>
            <option value="z-a">Z to A</option>
          </select>
          
          <button 
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
} 