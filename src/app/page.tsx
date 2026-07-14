import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCarousel from "@/components/ProductCarousel";

const bestSellers = [
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
  },
  {
    id: 3,
    name: "Watch 6N Full Touch Color Screen Smart Watch",
    slug: "oraimo-watch-6n-full-touch-clolor-screen-smart-watch-osw-8000n",
    image: "https://cdn-img.oraimo.com/fit-in/360x360/NG/product/2025/09/16/oraimo-smart-watch-watch-6n-osw-8000n-image-0.png",
    price: 4500,
    originalPrice: 6000,
    rating: 4.7,
    reviewCount: 8900,
    features: ["Full Touch Display", "Heart Rate Monitor"],
  },
  {
    id: 4,
    name: "BoomPop N Wireless Headphones",
    slug: "oraimo-boompop-n-wireless-headphones-ohp-915n",
    image: "https://cdn-img.oraimo.com/fit-in/360x360/GH/product/2025/07/14/oraimo-Wireless-Headphones-BoomPop-N-OHP-915N-0.png",
    price: 3200,
    originalPrice: 4000,
    rating: 4.6,
    reviewCount: 5600,
    features: ["65Hr Playtime", "Deep Bass"],
  },
  {
    id: 5,
    name: "OpenSnap N2 Quick Charging Open Ear True Wireless Earbuds",
    slug: "oraimo-opensnap-n2-quick-charging-adaptive-volume-open-ear-true-wireless-earbuds-opn-374n",
    image: "https://cdn-img.oraimo.com/fit-in/360x360/MA/product/2026/03/16/OPN-374N-BLACK-NEW.png",
    price: 4200,
    rating: 4.8,
    reviewCount: 3200,
    tag: "New Arrival",
    features: ["Quick Charging", "Adaptive Volume"],
  },
];

const newarrivals = [
  {
    id: 6,
    name: "SpaceBuds 2 True Wireless Earbuds",
    slug: "oraimo-spacebuds-2-true-wireless-earbuds-otw-631-spacegrey",
    image: "https://cdn-img.oraimo.com/fit-in/360x360/MA/product/2026/04/14/OTW-631-SPACEGREY-MAIN.png",
    price: 3800,
    rating: 4.7,
    reviewCount: 1500,
    tag: "New Arrival",
    features: ["AI Powered", "36Hr Playtime"],
  },
  {
    id: 7,
    name: "Watch Muse 1.32 AMOLED Smart Watch",
    slug: "oraimo-watch-muse-1.32-amoled-health-elegance-smart-watch",
    image: "https://cdn-img.oraimo.com/fit-in/360x360/KE/product/2025/05/23/oraimo-watch-muse-OSW-831N-4.png",
    price: 5500,
    originalPrice: 7000,
    rating: 4.9,
    reviewCount: 2800,
    tag: "eShop Exclusive",
    features: ["AMOLED Display", "Health Monitoring"],
  },
  {
    id: 8,
    name: "EasyCut 2 10W Super Powerful Hair Clipper",
    slug: "oraimo-easycut-2-10w-super-powerful-quick-charge-hair-clipper-ocl-233n",
    image: "https://cdn-img.oraimo.com/fit-in/360x360/KE/product/2026/04/28/OCL-233N-TITANIUM-MAINimage.png",
    price: 2800,
    rating: 4.6,
    reviewCount: 1200,
    tag: "eShop Exclusive",
    features: ["10W Powerful Motor", "Quick Charge"],
  },
  {
    id: 9,
    name: "SpaceBuds Air+ Metallic Texture True Wireless Earbuds",
    slug: "oraimo-spacebuds-air-metallic-texture-ipx4-true-wireless-earbuds-otw-323sp",
    image: "https://cdn-img.oraimo.com/fit-in/360x360/MA/product/2025/10/11/OTW-323SP-Total.png",
    price: 3200,
    rating: 4.5,
    reviewCount: 950,
    tag: "eShop Exclusive",
    features: ["Metallic Texture", "IPX4 Waterproof"],
  },
  {
    id: 10,
    name: "BoomPop Air Lightweight Wireless Headphones",
    slug: "oraimo-boompop-air-lightweight-durable-wireless-headphones-ohp-316",
    image: "https://cdn-img.oraimo.com/fit-in/360x360/KE/product/2026/04/13/oraimo-Headphone-BoomPop-Air-OHP-316-GRAVITYBLACK-mainimage.png",
    price: 2800,
    rating: 4.7,
    reviewCount: 450,
    tag: "New Arrival",
    features: ["Lightweight Design", "40Hr Playtime"],
  },
];

const categories = [
  { name: "Audio", image: "https://cdn-img.oraimo.com/KE/2026/05/26/Wireless_Stereo_Earbuds.svg", href: "/collections/audio" },
  { name: "Power", image: "https://cdn-img.oraimo.com/KE/2026/05/26/Power_Banks.svg", href: "/collections/power" },
  { name: "Smart & Office", image: "https://cdn-img.oraimo.com/KE/2026/05/26/Smart_Lighting.svg", href: "/collections/smart-office" },
  { name: "Personal Care", image: "https://cdn-img.oraimo.com/KE/2026/05/26/Grooming_Series.svg", href: "/collections/personal-care" },
  { name: "Home Appliances", image: "https://cdn-img.oraimo.com/KE/2026/05/26/Home_Appliances.svg", href: "/collections/home-appliances" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroCarousel />

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {categories.map((category) => (
                <a
                  key={category.name}
                  href={category.href}
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
              <a href="/collections/audio" className="relative overflow-hidden rounded-lg">
                <img
                  src="https://cdn-img.oraimo.com/2026/03/13/N-banner-1-1920-820.jpg"
                  alt="Audio Collection"
                  className="w-full h-48 md:h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Shop Audio</span>
                </div>
              </a>
              <a href="/collections/power" className="relative overflow-hidden rounded-lg">
                <img
                  src="https://cdn-img.oraimo.com/2026/03/13/N-banner-3-1920-820.jpg"
                  alt="Power Collection"
                  className="w-full h-48 md:h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Shop Power</span>
                </div>
              </a>
            </div>
          </div>
        </section>

        <ProductCarousel title="New Arrivals" products={newarrivals} />
      </main>

      <Footer />
    </div>
  );
}
