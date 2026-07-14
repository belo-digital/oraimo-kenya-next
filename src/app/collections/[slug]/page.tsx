import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBadges from "@/components/TrustBadges";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import { scrapeCategoryProducts } from "@/lib/scraper";
import { getFallbackProducts } from "@/lib/fallback-products";

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

const categorySubcategories: Record<string, { name: string; slug: string }[]> = {
  audio: [
    { name: "Wireless Stereo Earbuds", slug: "wireless-stereo-earbuds" },
    { name: "Wireless Neckband Headphones", slug: "wireless-neckband-headphones" },
    { name: "Wireless Over-Ear Headphones", slug: "wireless-over-ear-headphones" },
    { name: "Open-Ear Headphones", slug: "open-ear-headphones" },
    { name: "Wireless Speakers", slug: "wireless-speakers" },
  ],
  power: [
    { name: "Power Banks", slug: "power-banks" },
    { name: "Wall Chargers", slug: "wall-chargers" },
    { name: "Car Chargers", slug: "car-chargers" },
    { name: "Cables", slug: "cables" },
  ],
  "smart-office": [
    { name: "Smart Watches", slug: "smart-watches" },
    { name: "Smart Lighting", slug: "smart-lighting" },
    { name: "Mouse & Keyboards", slug: "mouse-keyboards" },
    { name: "Camera Accessories", slug: "camera-accessories" },
  ],
  "personal-care": [
    { name: "Grooming Series", slug: "grooming-series" },
    { name: "Oral Care", slug: "oral-care" },
  ],
  "home-appliances": [
    { name: "Blenders & Juicers", slug: "blenders" },
    { name: "Vacuums", slug: "vacuums" },
    { name: "Coffee Machines", slug: "coffee-machines" },
  ],
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryName = categoryNames[slug] || slug.replace(/-/g, " ");
  const subcategories = categorySubcategories[slug] || [];

  let products = getFallbackProducts(slug);

  try {
    const scraped = await scrapeCategoryProducts(slug);
    if (scraped.length > 0) {
      products = scraped;
    }
  } catch (error) {
    // Use fallback products
  }

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

          <div className="flex items-center justify-between py-4 border-b">
            <span className="text-sm text-gray-500">
              {products.length} products
            </span>
          </div>

          <div className="flex gap-8 py-6">
            {subcategories.length > 0 && (
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <h3 className="font-semibold text-gray-900 mb-3">{categoryName}</h3>
                <nav className="space-y-1">
                  {subcategories.map((sub) => (
                    <a
                      key={sub.slug}
                      href={`/collections/${sub.slug}`}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <span>{sub.name}</span>
                    </a>
                  ))}
                </nav>
              </aside>
            )}

            <div className="flex-1">
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
