"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/daily-deals", label: "Daily Deals", tag: "HOT" },
  { href: "/collections/audio", label: "Audio" },
  { href: "/collections/power", label: "Power" },
  { href: "/collections/smart-office", label: "Smart & Office" },
  { href: "/collections/personal-care", label: "Personal Care" },
  { href: "/collections/home-appliances", label: "Home Appliances", tag: "NEW" },
  { href: "/support", label: "Support" },
  { href: "/best-seller", label: "Hot & New" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="bg-gray-900 text-white text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span>Download oraimo App</span>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Register and subscribe to earn 100 points each!</span>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">oraimo</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors flex items-center gap-1"
              >
                {link.label}
                {link.tag && (
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    link.tag === "HOT" ? "bg-red-500 text-white" : "bg-green-500 text-white"
                  }`}>
                    {link.tag}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 px-2 text-gray-700 hover:bg-gray-50 hover:text-green-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
                {link.tag && (
                  <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                    link.tag === "HOT" ? "bg-red-500 text-white" : "bg-green-500 text-white"
                  }`}>
                    {link.tag}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
