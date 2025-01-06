import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <nav className="flex space-x-4">
        <Link to="/" className="text-blue-500 hover:underline">Home</Link>
        <Link to="/projects" className="text-blue-500 hover:underline">Projects</Link>
        <Link to="/articles" className="text-blue-500 hover:underline">Articles</Link>
      </nav>
      <div className="flex space-x-4">
        <button>Theme Toggle</button>
        <button>Language Switch</button>
      </div>
    </header>
  );
};

export default Header;
