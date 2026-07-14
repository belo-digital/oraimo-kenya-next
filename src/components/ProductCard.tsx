import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
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
}

export default function ProductCard({
  name,
  slug,
  image,
  price,
  originalPrice,
  rating,
  reviewCount,
  tag,
  tagColor = "#08B504",
  features,
}: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {tag && (
        <span
          className="absolute top-2 left-2 z-10 text-xs font-medium px-2 py-1 rounded"
          style={{ backgroundColor: tagColor, color: "white" }}
        >
          {tag}
        </span>
      )}

      <Link href={`/product/${slug}`} className="block">
        <div className="relative aspect-square bg-gray-50 p-4">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <span className="text-sm font-medium text-yellow-500">{rating}</span>
          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm text-gray-500">({reviewCount.toLocaleString()})</span>
        </div>

        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 min-h-[40px]">
          {name}
        </h3>

        {features && features.length > 0 && (
          <div className="mb-3 space-y-1">
            {features.slice(0, 2).map((feature, i) => (
              <div key={i} className="flex items-center gap-1 text-xs text-gray-600">
                <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            KES {price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              KES {originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <div className="mt-3 flex gap-2">
          <Link
            href={`/product/${slug}`}
            className="flex-1 text-center py-2 px-4 border border-green-600 text-green-600 rounded-full text-sm font-medium hover:bg-green-50 transition-colors"
          >
            Learn More
          </Link>
          <button className="flex-1 py-2 px-4 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
