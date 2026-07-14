"use client";

import { useState } from "react";

interface SortFilterProps {
  totalProducts: number;
  onSortChange?: (sort: string) => void;
  onFilterToggle?: () => void;
}

const sortOptions = [
  { value: "recommend", label: "Recommend" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "best-selling", label: "Best Selling" },
];

export default function SortFilter({
  totalProducts,
  onSortChange,
  onFilterToggle,
}: SortFilterProps) {
  const [selectedSort, setSelectedSort] = useState("recommend");

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    onSortChange?.(value);
  };

  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex items-center gap-4">
        <button
          onClick={onFilterToggle}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-green-600 lg:hidden"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filters
        </button>
        <span className="text-sm text-gray-500 hidden sm:inline">
          {totalProducts} products
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 hidden sm:inline">Sort by</span>
        <select
          value={selectedSort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
