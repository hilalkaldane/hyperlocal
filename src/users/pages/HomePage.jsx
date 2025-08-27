import React from 'react';
import CategoryBox from '../components/CategoryBox';

const categories = [
  { name: 'clothing', description: 'Fashion & Apparel' },
  { name: 'restaurant', description: 'Food & Dining' },
  { name: 'coaches', description: 'Fitness & Wellness' },
  { name: 'electronics', description: 'Gadgets & Devices' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-poppins">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          Discover & Save at Your Local Favorites
        </h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto mb-8">
          Find trusted merchants, grab exclusive discounts, and support your neighborhood.
        </p>
        <button className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-xl transition">
          Explore Now
        </button>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Browse Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {categories.map(({ name, description }) => (
            <CategoryBox key={name} name={name} description={description} />
          ))}
        </div>
      </section>

      {/* Optional value prop, testimonials, or other */}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center text-sm">
        &copy; 2025 YourAppName. All rights reserved.
      </footer>
    </div>
  );
}
