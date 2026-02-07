export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Smart Home Controller',
      description: 'IoT-based home automation system with voice control',
      tech: ['Raspberry Pi', 'Python', 'MQTT'],
      image: '🏠',
    },
    {
      id: 2,
      title: 'Weather Station',
      description: 'Real-time weather monitoring with custom sensors',
      tech: ['Arduino', 'C++', 'Node.js'],
      image: '🌤️',
    },
    {
      id: 3,
      title: 'LED Matrix Display',
      description: 'Programmable RGB LED matrix for custom animations',
      tech: ['ESP32', 'FastLED', 'WebSockets'],
      image: '💡',
    },
    {
      id: 4,
      title: 'Robot Arm',
      description: '6-DOF robotic arm with inverse kinematics',
      tech: ['3D Printing', 'Servos', 'Python'],
      image: '🦾',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Projects</h1>
      <p className="text-lg text-gray-600 mb-12">
        A collection of software and hardware projects built with passion and curiosity.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-48 flex items-center justify-center text-8xl">
              {project.image}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                  >
                    {tech}
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
