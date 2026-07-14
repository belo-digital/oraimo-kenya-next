import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { scrapeCategoryProducts } from "@/lib/scraper";
import { getFallbackProducts } from "@/lib/fallback-products";
import * as cheerio from "cheerio";

export const revalidate = 3600;

const BASE_URL = "https://ke.oraimo.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  try {
    const url = `${BASE_URL}/product/${slug}`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    if (response.ok) {
      const html = await response.text();
      const $ = cheerio.load(html);

      const name = $("h1").first().text().trim();
      const priceText = $(".product-price span").first().text().replace(/[^0-9.]/g, "");
      const price = parseFloat(priceText) || 0;
      const originalPriceText = $(".product-price del").text().replace(/[^0-9.]/g, "");
      const originalPrice = originalPriceText ? parseFloat(originalPriceText) : undefined;
      const image = $("img.product-picture, img.main-picture").first().attr("src") || "";
      const ratingText = $(".review-score").first().text();
      const rating = parseFloat(ratingText) || 0;
      const reviewCountText = $(".review-count").text().replace(/[()]/g, "");
      const reviewCount = parseInt(reviewCountText) || 0;

      const features: string[] = [];
      $(".product-point span span").each((_, el) => {
        const text = $(el).text().trim();
        if (text) features.push(text);
      });

      if (name) {
        return {
          name,
          slug,
          image: image.startsWith("http") ? image : `${BASE_URL}${image}`,
          price,
          originalPrice,
          rating,
          reviewCount,
          features,
        };
      }
    }
  } catch (error) {
    // Fall through to fallback
  }

  const fallback = getFallbackProducts("audio");
  const fallbackProduct = fallback.find((p) => p.slug === slug) || fallback[0];
  return fallbackProduct;
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
            <a href="/" className="text-green-600 hover:underline">
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

              {product.rating > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-medium text-yellow-500">{product.rating}</span>
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {product.reviewCount > 0 && (
                    <span className="text-sm text-gray-500">({product.reviewCount.toLocaleString()} reviews)</span>
                  )}
                </div>
              )}

              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  KES {(product.price || 0).toLocaleString()}
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
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
