import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchPage, parseProducts, Product } from "@/lib/scraper";
import * as cheerio from "cheerio";

export const revalidate = 3600;

const BASE_URL = "https://ke.oraimo.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const url = `${BASE_URL}/product/${slug}`;
    const html = await fetchPage(url);
    const products = parseProducts(html, "product");

    const $ = cheerio.load(html);
    const title = $("h1").first().text().trim() || slug.replace(/-/g, " ");
    const priceText = $(".product-price span").first().text().replace(/[^0-9.]/g, "");
    const price = parseFloat(priceText) || 0;

    const originalPriceText = $(".product-price del").text().replace(/[^0-9.]/g, "");
    const originalPrice = originalPriceText ? parseFloat(originalPriceText) : undefined;

    const image = $("img.product-picture, img.main-picture").first().attr("src") || "";
    const description = $(".product-description, .product-detail").first().html() || "";

    const features: string[] = [];
    $(".product-feature, .feature-item").each((_, el) => {
      const text = $(el).text().trim();
      if (text) features.push(text);
    });

    const images: string[] = [];
    $("img.product-gallery, .gallery img").each((_, el) => {
      const src = $(el).attr("src") || $(el).attr("data-src");
      if (src) images.push(src);
    });

    return {
      id: 0,
      name: title,
      slug,
      image: image.startsWith("http") ? image : `${BASE_URL}${image}`,
      price,
      originalPrice,
      rating: 0,
      reviewCount: 0,
      features: features.length > 0 ? features : undefined,
      category: "",
      url: `${BASE_URL}/product/${slug}`,
    };
  } catch (error) {
    console.error("Failed to scrape product:", error);
    return null;
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Product Not Found
            </h1>
            <a
              href="/"
              className="text-green-600 hover:underline"
            >
              Return to homepage
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <nav className="text-sm text-gray-500 mb-6">
            <a href="/" className="hover:text-green-600">Home</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-8">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-contain max-h-[500px]"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  KES {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="ml-3 text-lg text-gray-400 line-through">
                    KES {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600">
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-4">
                <button className="flex-1 py-3 px-6 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors">
                  Add to Cart
                </button>
                <button className="py-3 px-6 border border-green-600 text-green-600 rounded-full font-semibold hover:bg-green-50 transition-colors">
                  Buy Now
                </button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline text-sm"
                >
                  View on official site →
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
