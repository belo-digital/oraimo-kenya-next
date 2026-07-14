export default function TrustBadges() {
  const badges = [
    {
      icon: "https://cdn-img.oraimo.com/KE/2026/03/31/99e811981842bc428b8244bb1387c806.png",
      text: "Fast Free Shipping over KES1500",
    },
    {
      icon: "https://cdn-img.oraimo.com/KE/2026/03/31/82d85222a8b7bdb2c06383c726bd0cb1.png",
      text: "Cash On Delivery",
    },
    {
      icon: "https://cdn-img.oraimo.com/KE/2026/03/31/f660d142fd699ee8613075e9212080d3.png",
      text: "Hassle-Free Warranty",
    },
  ];

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-center gap-8 py-3 overflow-x-auto">
          {badges.map((badge, i) => (
            <div key={i} className="flex items-center gap-2 flex-shrink-0">
              <img
                src={badge.icon}
                alt={badge.text}
                className="w-6 h-6 object-contain"
              />
              <span className="text-sm text-gray-700 whitespace-nowrap">
                {badge.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
