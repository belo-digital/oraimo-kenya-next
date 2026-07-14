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
  category?: string;
  url?: string;
  colors?: { image: string; name: string }[];
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
  colors,
}: ProductCardProps) {
  const getTagStyle = (tag: string) => {
    if (tag.includes("New")) return "bg-green-500";
    if (tag.includes("Exclusive")) return "bg-purple-600";
    if (tag.includes("APP") || tag.includes("Deal")) return "bg-orange-500";
    if (tag.includes("Flagship")) return "bg-blue-600";
    return "bg-green-500";
  };

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden">
      {tag && (
        <span
          className={`absolute top-2 left-2 z-10 text-xs font-medium px-2 py-1 rounded ${getTagStyle(tag)}`}
          style={{ color: "white" }}
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
            loading="lazy"
          />

          {colors && colors.length > 0 && (
            <div className="absolute bottom-2 left-2 flex items-center gap-1">
              {colors.slice(0, 3).map((color, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border border-gray-200 overflow-hidden bg-white"
                >
                  <img
                    src={color.image}
                    alt={color.name}
                    className="w-full h-full object-contain p-0.5"
                    loading="lazy"
                  />
                </div>
              ))}
              {colors.length > 3 && (
                <span className="text-xs text-gray-500 ml-1">
                  +{colors.length}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>

      <div className="p-3">
        <div className="flex items-center gap-1 mb-1">
          <span className="text-sm font-medium text-yellow-500">{rating}</span>
          <svg
            className="w-4 h-4 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-xs text-gray-500">({reviewCount.toLocaleString()})</span>
        </div>

        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 min-h-[40px]">
          <Link href={`/product/${slug}`} className="hover:text-green-600 transition-colors">
            {name}
          </Link>
        </h3>

        {features && features.length > 0 && (
          <div className="mb-2 space-y-1">
            {features.slice(0, 2).map((feature, i) => (
              <div key={i} className="flex items-center gap-1 text-xs text-gray-600">
                <svg
                  className="w-3 h-3 text-green-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 mb-3">
          <span className="text-base font-bold text-gray-900">
            KES {price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              KES {originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <Link
            href={`/product/${slug}`}
            className="flex-1 text-center py-2 px-3 border border-green-600 text-green-600 rounded-full text-sm font-medium hover:bg-green-50 transition-colors"
          >
            Learn More
          </Link>
          <button className="flex-1 py-2 px-3 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
