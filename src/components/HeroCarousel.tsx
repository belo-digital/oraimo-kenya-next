"use client";

import { useState } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image: "https://cdn-img.oraimo.com/2026/07/09/1920-820.jpg",
    mobileImage: "https://cdn-img.oraimo.com/2026/07/09/750-1040.jpg",
    alt: "Oraimo SpaceBuds 2 AI Powered",
    link: "/product/oraimo-spacebuds-2-true-wireless-earbuds-otw-631-spacegrey",
  },
  {
    id: 2,
    image: "https://cdn-img.oraimo.com/2026/07/06/20260706-105632.jpg",
    mobileImage: "https://cdn-img.oraimo.com/2026/07/06/20260706-104011.jpg",
    alt: "Smart & Office Collection",
    link: "/collections/smart-office",
  },
  {
    id: 3,
    image: "https://cdn-img.oraimo.com/2026/03/13/N-banner-1-1920-820.jpg",
    mobileImage: "https://cdn-img.oraimo.com/2026/03/13/N-banner-1-7501040.jpg",
    alt: "Oraimo Audio Collection",
    link: "/collections/audio",
  },
  {
    id: 4,
    image: "https://cdn-img.oraimo.com/2026/03/13/N-banner-3-1920-820.jpg",
    mobileImage: "https://cdn-img.oraimo.com/2026/03/13/N-banner-3-750-1040.jpg",
    alt: "Oraimo Home Appliances Collection",
    link: "/collections/home-appliances",
  },
  {
    id: 5,
    image: "https://cdn-img.oraimo.com/2026/05/20/OBR-841A-PC.jpg",
    mobileImage: "https://cdn-img.oraimo.com/2026/05/20/OBR-841A-M.jpg",
    alt: "Oraimo New Arrival",
    link: "/product/oraimo-easypump-lightweight-gentle-wearable-breast-pump-obr-841a",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full bg-gray-100">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide) => (
            <a key={slide.id} href={slide.link} className="min-w-full block">
              <picture>
                <source srcSet={slide.image} media="(min-width: 1280px)" />
                <img
                  src={slide.mobileImage}
                  alt={slide.alt}
                  className="w-full h-auto object-cover"
                />
              </picture>
            </a>
          ))}
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-colors"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-colors"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === current ? "bg-green-600" : "bg-white/60 hover:bg-white"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
