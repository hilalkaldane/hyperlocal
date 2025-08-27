// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold text-blue-700">
          DiscoverLocal
        </Link>
        <nav className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
            Categories
          </Link>
          {/* Add more nav links if needed */}
        </nav>
      </div>
    </header>
  );
}
