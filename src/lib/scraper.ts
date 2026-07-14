import * as cheerio from "cheerio";

export interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  tag?: string;
  tagColor?: string;
  features?: string[];
  category: string;
}

export interface Category {
  name: string;
  slug: string;
  image: string;
}

const BASE_URL = "https://ke.oraimo.com";

export async function fetchPage(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }

  return response.text();
}

export function parseProducts(html: string, category: string): Product[] {
  const $ = cheerio.load(html);
  const products: Product[] = [];

  $(".js_product, .site-product").each((index, element) => {
    const $el = $(element);
    const link = $el.find("a.js_product, a.js_select_item").first();
    const href = link.attr("href") || "";
    const name = $el.find("h3 a").text().trim() || link.attr("data-name") || "";
    const price = parseFloat(link.attr("data-price") || "0");
    const id = parseInt(link.attr("data-id") || "0");
    const sku = link.attr("data-sku") || "";

    const imageEl = $el.find("img.product-picture").first();
    const image =
      imageEl.attr("data-src") || imageEl.attr("src") || "";

    const ratingEl = $el.find(".review-score");
    const rating = parseFloat(ratingEl.text()) || 0;

    const reviewCountEl = $el.find(".review-count");
    const reviewCountText = reviewCountEl.text().replace(/[()]/g, "");
    const reviewCount = parseInt(reviewCountText) || 0;

    const tagEl = $el.find(".product-tag-new-content");
    const tag = tagEl.text().trim() || undefined;

    const tagColorEl = $el.find(".product-tag-new");
    const tagColor = tagColorEl.attr("style")?.includes("#08B504")
      ? "#08B504"
      : tagEl.attr("style")?.includes("background-color:")
      ? tagColorEl.attr("style")?.match(/background-color:\s*(#[0-9A-Fa-f]+)/)?.[1]
      : undefined;

    const features: string[] = [];
    $el.find(".product-point span span").each((_, el) => {
      const text = $(el).text().trim();
      if (text) features.push(text);
    });

    const priceEl = $el.find(".product-price span").first();
    const displayPrice = priceEl.text().replace(/[^0-9.]/g, "");
    const parsedPrice = parseFloat(displayPrice) || price;

    const originalPriceEl = $el.find(".product-price del");
    const originalPriceText = originalPriceEl.text().replace(/[^0-9.]/g, "");
    const originalPrice = originalPriceText
      ? parseFloat(originalPriceText)
      : undefined;

    if (name && image) {
      const slug = href
        .replace(BASE_URL, "")
        .replace(/^\/product\//, "")
        .split("?")[0];

      products.push({
        id: id || index,
        name,
        slug: slug || `product-${index}`,
        image: image.startsWith("http") ? image : `${BASE_URL}${image}`,
        price: parsedPrice || 0,
        originalPrice,
        rating,
        reviewCount,
        tag,
        tagColor,
        features: features.length > 0 ? features : undefined,
        category,
      });
    }
  });

  return products;
}

export function parseCategories(html: string): Category[] {
  const $ = cheerio.load(html);
  const categories: Category[] = [];

  $(
    ".header-nav-product-link, .header-menu-item a"
  ).each((_, element) => {
    const $el = $(element);
    const name = $el.find(".header-nav-product-text, span").first().text().trim();
    const href = $el.attr("href") || "";
    const icon = $el.find("img.header-nav-product-icon").attr("data-src") || "";

    if (name && href && !href.includes("javascript:")) {
      const slug = href
        .replace(BASE_URL, "")
        .replace(/^\/collections\//, "")
        .split("?")[0];

      categories.push({
        name,
        slug,
        image: icon.startsWith("http") ? icon : `${BASE_URL}${icon}`,
      });
    }
  });

  return categories;
}

export async function scrapeCategoryProducts(
  categorySlug: string
): Promise<Product[]> {
  const url = `${BASE_URL}/collections/${categorySlug}`;
  const html = await fetchPage(url);
  return parseProducts(html, categorySlug);
}

export async function scrapeBestSellers(): Promise<Product[]> {
  const url = `${BASE_URL}/best-seller.html`;
  const html = await fetchPage(url);
  return parseProducts(html, "best-seller");
}

export async function scrapeNewArrivals(): Promise<Product[]> {
  const url = `${BASE_URL}/new-arrival.html`;
  const html = await fetchPage(url);
  return parseProducts(html, "new-arrival");
}

export async function scrapeDailyDeals(): Promise<Product[]> {
  const url = `${BASE_URL}/oraimo-daily-deals.html`;
  const html = await fetchPage(url);
  return parseProducts(html, "daily-deals");
}

export async function scrapeAllCategories(): Promise<Category[]> {
  const html = await fetchPage(BASE_URL);
  return parseCategories(html);
}

export async function scrapeHomepageProducts(): Promise<{
  bestSellers: Product[];
  newArrivals: Product[];
  categories: Category[];
}> {
  const html = await fetchPage(BASE_URL);
  const products = parseProducts(html, "homepage");
  const categories = parseCategories(html);

  const bestSellers = products.filter(
    (p) => p.category === "best-seller" || p.tag === "Best Seller"
  );
  const newArrivals = products.filter(
    (p) => p.tag === "New Arrival" || p.tag === "eShop Exclusive"
  );

  return {
    bestSellers: bestSellers.length > 0 ? bestSellers : products.slice(0, 10),
    newArrivals: newArrivals.length > 0 ? newArrivals : products.slice(10, 20),
    categories: categories.slice(0, 10),
  };
}
