import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCarousel from "@/components/ProductCarousel";
import { scrapeHomepageProducts, Product } from "@/lib/scraper";

export const revalidate = 3600; // Revalidate every hour (ISR)

const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "Necklace Lite Call Vibration Wireless Headphones",
    slug: "oraimo-necklace-lite-call-vibration-30-hrs-playtime-app-wireless-headphones",
    image: "https://cdn-img.oraimo.com/fit-in/360x360/MA/product/2024/03/19/OEB-311.png",
    price: 1600,
    originalPrice: 3000,
    rating: 4.9,
    reviewCount: 20855,
    features: ["30Hr Playtime", "Vibration Notifications"],
    category: "audio",

  },
  {
    id: 2,
    name: "SpaceBuds Neo True Wireless Spatial Earbuds",
    slug: "oraimo-spacebuds-neo-true-wireless-spatial-earbuds-otw-323",
    image: "https://cdn-img.oraimo.com/fit-in/360x360/GH/product/2025/01/09/spacebuds-neo-otw-323.png",
    price: 3500,
    originalPrice: 4500,
    rating: 4.8,
    reviewCount: 12500,
    features: ["Spatial Audio", "Active Noise Cancellation"],
    category: "audio",

  },
];

const fallbackCategories = [
  { name: "Audio", slug: "audio", image: "https://cdn-img.oraimo.com/KE/2026/05/26/Wireless_Stereo_Earbuds.svg" },
  { name: "Power", slug: "power", image: "https://cdn-img.oraimo.com/KE/2026/05/26/Power_Banks.svg" },
  { name: "Smart & Office", slug: "smart-office", image: "https://cdn-img.oraimo.com/KE/2026/05/26/Smart_Lighting.svg" },
  { name: "Personal Care", slug: "personal-care", image: "https://cdn-img.oraimo.com/KE/2026/05/26/Grooming_Series.svg" },
  { name: "Home Appliances", slug: "home-appliances", image: "https://cdn-img.oraimo.com/KE/2026/05/26/Home_Appliances.svg" },
];

async function getProducts() {
  try {
    const data = await scrapeHomepageProducts();
    return {
      bestSellers: data.bestSellers.length > 0 ? data.bestSellers : fallbackProducts,
      newArrivals: data.newArrivals.length > 0 ? data.newArrivals : fallbackProducts,
      categories: data.categories.length > 0 ? data.categories : fallbackCategories,
    };
  } catch (error) {
    console.error("Failed to scrape products:", error);
    return {
      bestSellers: fallbackProducts,
      newArrivals: fallbackProducts,
      categories: fallbackCategories,
    };
  }
}

export default async function Home() {
  const { bestSellers, newArrivals, categories } = await getProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroCarousel />

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Shop by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {categories.map((category) => (
                <a
                  key={category.slug}
                  href={`/collections/${category.slug}`}
                  className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors group"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-16 h-16 mb-3 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-green-600">
                    {category.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <ProductCarousel title="Best Sellers" products={bestSellers} />

        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/collections/audio"
                className="relative overflow-hidden rounded-lg"
              >
                <img
                  src="https://cdn-img.oraimo.com/2026/03/13/N-banner-1-1920-820.jpg"
                  alt="Audio Collection"
                  className="w-full h-48 md:h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    Shop Audio
                  </span>
                </div>
              </a>
              <a
                href="/collections/power"
                className="relative overflow-hidden rounded-lg"
              >
                <img
                  src="https://cdn-img.oraimo.com/2026/03/13/N-banner-3-1920-820.jpg"
                  alt="Power Collection"
                  className="w-full h-48 md:h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    Shop Power
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>

        <ProductCarousel title="New Arrivals" products={newArrivals} />
      </main>

      <Footer />
    </div>
  );
}
