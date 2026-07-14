"use client";

import { useState } from "react";
import Link from "next/link";

interface Subcategory {
  name: string;
  slug: string;
  count?: number;
}

interface CategorySidebarProps {
  subcategories: Subcategory[];
  currentSlug: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CategorySidebar({
  subcategories,
  currentSlug,
  isOpen,
  onClose,
}: CategorySidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 overflow-y-auto
          lg:relative lg:transform-none lg:z-auto lg:w-full lg:h-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <h3 className="font-semibold text-gray-900">Categories</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="space-y-1">
            {subcategories.map((sub) => (
              <Link
                key={sub.slug}
                href={`/collections/${sub.slug}`}
                className={`
                  flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors
                  ${
                    currentSlug === sub.slug
                      ? "bg-green-50 text-green-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                <span>{sub.name}</span>
                {sub.count !== undefined && (
                  <span className="text-xs text-gray-400">{sub.count}</span>
                )}
              </Link>
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t">
            <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                Under KES 1,000
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                KES 1,000 - KES 3,000
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                KES 3,000 - KES 5,000
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                Over KES 5,000
              </label>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <h4 className="font-medium text-gray-900 mb-3">Features</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                Noise Cancellation
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                Waterproof
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                Wireless
              </label>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
