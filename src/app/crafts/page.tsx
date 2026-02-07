export default function Crafts() {
  const crafts = [
    {
      id: 1,
      title: 'Handmade Ceramic Mugs',
      description: 'Unique pottery pieces with custom glazes',
      materials: ['Clay', 'Glaze', 'Kiln'],
      image: '☕',
    },
    {
      id: 2,
      title: 'Wooden Cutting Boards',
      description: 'End-grain cutting boards from reclaimed wood',
      materials: ['Walnut', 'Maple', 'Mineral Oil'],
      image: '🪵',
    },
    {
      id: 3,
      title: 'Leather Journal Covers',
      description: 'Hand-stitched leather covers for notebooks',
      materials: ['Leather', 'Thread', 'Wax'],
      image: '📔',
    },
    {
      id: 4,
      title: 'Knitted Scarves',
      description: 'Cozy winter scarves with unique patterns',
      materials: ['Wool', 'Needles', 'Patterns'],
      image: '🧣',
    },
    {
      id: 5,
      title: 'Glass Terrariums',
      description: 'Miniature ecosystems in glass containers',
      materials: ['Glass', 'Soil', 'Succulents'],
      image: '🌱',
    },
    {
      id: 6,
      title: 'Macramé Wall Hangings',
      description: 'Boho-style wall art using macramé techniques',
      materials: ['Cotton Cord', 'Driftwood', 'Beads'],
      image: '🪢',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Crafts</h1>
      <p className="text-lg text-gray-600 mb-12">
        Handmade crafts and creative works, each piece crafted with care and attention to detail.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {crafts.map((craft) => (
          <div
            key={craft.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <div className="bg-gradient-to-br from-green-500 to-teal-600 h-48 flex items-center justify-center text-8xl">
              {craft.image}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{craft.title}</h3>
              <p className="text-gray-600 mb-4">{craft.description}</p>
              <div className="flex flex-wrap gap-2">
                {craft.materials.map((material, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
