import React from 'react';
import { CategoryFilter } from '@/lib/types';

interface FilterButtonsProps {
  activeFilter: CategoryFilter;
  onFilterChange: (filter: CategoryFilter) => void;
}

const categories: CategoryFilter[] = ['All', 'FX', 'Metals', 'Energy', 'Grains', 'Index', 'Bonds', 'Crypto'];

export default function FilterButtons({ activeFilter, onFilterChange }: FilterButtonsProps) {
  return (
    <div className="mb-6">
      <h3 className="text-gray-400 text-sm font-medium mb-3">Filter by Category</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onFilterChange(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeFilter === category
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
