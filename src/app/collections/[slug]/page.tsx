import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { scrapeCategoryProducts, Product } from "@/lib/scraper";

export const revalidate = 3600;

const categoryNames: Record<string, string> = {
  audio: "Audio",
  power: "Power",
  "smart-office": "Smart & Office",
  "personal-care": "Personal Care",
  "home-appliances": "Home Appliances",
  "wireless-stereo-earbuds": "Wireless Stereo Earbuds",
  "wireless-neckband-headphones": "Wireless Neckband Headphones",
  "wireless-over-ear-headphones": "Wireless Over-Ear Headphones",
  "open-ear-headphones": "Open-Ear Headphones",
  "wireless-speakers": "Wireless Speakers",
  "power-banks": "Power Banks",
  "wall-chargers": "Wall Chargers",
  "wireless-chargers": "Wireless Chargers",
  "car-chargers": "Car Chargers",
  cables: "Cables",
  "smart-watches": "Smart Watches",
  "smart-lighting": "Smart Lighting",
  "mouse-keyboards": "Mouse & Keyboards",
  "camera-accessories": "Camera Accessories",
  networking: "Mi-Fi",
  "grooming-series": "Grooming Series",
  "oral-care": "Oral Care",
};

const fallbackProducts: Product[] = [];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryName = categoryNames[slug] || slug.replace(/-/g, " ");

  let products: Product[] = [];
  try {
    products = await scrapeCategoryProducts(slug);
  } catch (error) {
    console.error("Failed to scrape category:", error);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {categoryName}
            </h1>
            <p className="text-gray-600">
              {products.length} products found
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
