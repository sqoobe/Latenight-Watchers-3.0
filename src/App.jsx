import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { MovieProvider } from './context/MovieContext';
import SearchMovies from './components/searchMovies';
import Navbar from './components/Navbar';
import Favorites from './pages/favorites';
import Watchlist from './pages/watchlist';
import './styles/darkMode.css';
import './styles/lightmode.css';
import './styles/index.css';

/**
 * Main App component
 * 
 * Wraps the application with ThemeProvider for theme functionality
 * Includes the ThemeToggle and SearchMovies components
 */
function App() {
  return (
    <ThemeProvider>
      <MovieProvider>
        <Router>
      <div className="container">
            <Navbar />
        <main>
              <Routes>
                <Route path="/" element={<SearchMovies />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/watchlist" element={<Watchlist />} />
              </Routes>
        </main>
      </div>
        </Router>
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;