import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState({ clients: [], lawyers: [], cases: [] });

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === '') {
      setResults({ clients: [], lawyers: [], cases: [] });
      return;
    }

    try {
      const response = await fetch(`/search?q=${encodeURIComponent(term)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const highlightText = (text) => {
    if (!searchTerm) return text;

    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="search-container">
      <FaSearch className="icon" />
      <input
        type="text"
        className="search-bar"
        placeholder="Enter case number, client name, or lawyer name..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
