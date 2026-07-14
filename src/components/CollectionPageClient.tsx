"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBadges from "@/components/TrustBadges";
import Breadcrumb from "@/components/Breadcrumb";
import SortFilter from "@/components/SortFilter";
import ProductCard from "@/components/ProductCard";
import CategorySidebar from "@/components/CategorySidebar";
import { Product } from "@/lib/scraper";

const categorySubcategories: Record<string, { name: string; slug: string }[]> = {
  audio: [
    { name: "Wireless Stereo Earbuds", slug: "wireless-stereo-earbuds" },
    { name: "Wireless Neckband Headphones", slug: "wireless-neckband-headphones" },
    { name: "Wireless Over-Ear Headphones", slug: "wireless-over-ear-headphones" },
    { name: "Open-Ear Headphones", slug: "open-ear-headphones" },
    { name: "Wireless Speakers", slug: "wireless-speakers" },
    { name: "Wired Earphones", slug: "wired-earphones" },
  ],
  power: [
    { name: "Power Banks", slug: "power-banks" },
    { name: "Wall Chargers", slug: "wall-chargers" },
    { name: "Wireless Chargers", slug: "wireless-chargers" },
    { name: "Car Chargers", slug: "car-chargers" },
    { name: "Cables", slug: "cables" },
  ],
  "smart-office": [
    { name: "Smart Watches", slug: "smart-watches" },
    { name: "Smart Lighting", slug: "smart-lighting" },
    { name: "Mouse & Keyboards", slug: "mouse-keyboards" },
    { name: "Camera Accessories", slug: "camera-accessories" },
    { name: "Mi-Fi", slug: "networking" },
  ],
  "personal-care": [
    { name: "Grooming Series", slug: "grooming-series" },
    { name: "Oral Care", slug: "oral-care" },
  ],
  "home-appliances": [
    { name: "Blenders & Juicers", slug: "blenders" },
    { name: "Vacuums", slug: "vacuums" },
    { name: "Coffee Machines", slug: "coffee-machines" },
    { name: "Air Fryers", slug: "air-fryers" },
  ],
};

const categoryNames: Record<string, string> = {
  audio: "Audio",
  power: "Power",
  "smart-office": "Smart & Office",
  "personal-care": "Personal Care",
  "home-appliances": "Home Appliances",
};

interface CollectionPageClientProps {
  slug: string;
  products: Product[];
}

export default function CollectionPageClient({
  slug,
  products,
}: CollectionPageClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState("recommend");

  const categoryName = categoryNames[slug] || slug.replace(/-/g, " ");
  const subcategories = categorySubcategories[slug] || [];

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "best-selling":
        return b.reviewCount - a.reviewCount;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <TrustBadges />

        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Product", href: "/collections/products" },
              { label: categoryName },
            ]}
          />

          <SortFilter
            totalProducts={products.length}
            onSortChange={setSortBy}
            onFilterToggle={() => setSidebarOpen(true)}
          />

          <div className="flex gap-8 py-6">
            {subcategories.length > 0 && (
              <div className="hidden lg:block w-64 flex-shrink-0">
                <CategorySidebar
                  subcategories={subcategories}
                  currentSlug={slug}
                  isOpen={false}
                  onClose={() => {}}
                />
              </div>
            )}

            <div className="flex-1">
              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No products found in this category.
                  </p>
                  <a
                    href="/"
                    className="mt-4 inline-block text-green-600 hover:underline"
                  >
                    Return to homepage
                  </a>
                </div>
              )}

              {sortedProducts.length > 0 && (
                <div className="flex justify-center mt-8 gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium">
                    1
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <CategorySidebar
        subcategories={subcategories}
        currentSlug={slug}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </div>
  );
}
