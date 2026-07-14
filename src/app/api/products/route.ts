import { NextRequest, NextResponse } from "next/server";
import {
  scrapeBestSellers,
  scrapeNewArrivals,
  scrapeDailyDeals,
  scrapeCategoryProducts,
  scrapeAllCategories,
  scrapeHomepageProducts,
} from "@/lib/scraper";

const CACHE_DURATION = 3600; // 1 hour in seconds

const cache = new Map<string, { data: unknown; timestamp: number }>();

function getCachedData(key: string) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION * 1000) {
    return cached.data;
  }
  return null;
}

function setCachedData(key: string, data: unknown) {
  cache.set(key, { data, timestamp: Date.now() });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type") || "homepage";
  const category = searchParams.get("category");

  const cacheKey = `${type}-${category || "all"}`;
  const cached = getCachedData(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  try {
    let data;

    switch (type) {
      case "best-sellers":
        data = await scrapeBestSellers();
        break;
      case "new-arrivals":
        data = await scrapeNewArrivals();
        break;
      case "daily-deals":
        data = await scrapeDailyDeals();
        break;
      case "categories":
        data = await scrapeAllCategories();
        break;
      case "category":
        if (!category) {
          return NextResponse.json(
            { error: "Category parameter required" },
            { status: 400 }
          );
        }
        data = await scrapeCategoryProducts(category);
        break;
      case "homepage":
      default:
        data = await scrapeHomepageProducts();
        break;
    }

    setCachedData(cacheKey, data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json(
      { error: "Failed to scrape data" },
      { status: 500 }
    );
  }
}
