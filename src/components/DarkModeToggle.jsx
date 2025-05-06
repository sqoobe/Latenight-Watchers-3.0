import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function DarkModeToggle() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button 
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
} 