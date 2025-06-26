import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <nav className="bg-blue-300 text-white px-4 py-3 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
      <Link to="/" className="text-xl font-bold hover:underline hover:text-green-200">
        Recipe Finder
      </Link>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search recipes..."
          className="px-3 py-1 rounded text-black font-bold border-2 border-gray-300"
        />
        <button
          type="submit"
          className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
        >
          Search
        </button>
      </form>
      <Link to="/favorites" className="font-bold text-xl hover:underline hover:text-green-200">
        Favorites
      </Link>
    </nav>
  );
};
