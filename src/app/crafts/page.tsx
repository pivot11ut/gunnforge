export default function Crafts() {
  const crafts = [
    {
      id: 1,
      title: 'Laser Etched Coins',
      description: 'Custom laser-etched designs on metal coins',
      materials: ['Metal', 'Laser Engraver', 'Design Software'],
      image: '🪙',
    },
    {
      id: 2,
      title: 'Wooden Cutting Boards',
      description: 'Bamboo and hardwood cutting boards with personalized engravings',
      materials: ['Walnut', 'Maple', 'Mineral Oil'],
      image: '🪵',
    },
    {
      id: 3,
      title: 'Square Slate Coasters',
      description: 'Custom engraved slate coasters for drinks',
      materials: ['Slate', 'Laser Engraver', 'Design Software'],
      image: '📔',
    }
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
