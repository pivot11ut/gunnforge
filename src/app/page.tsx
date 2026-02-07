import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to GunnForge
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A showcase of creative projects and crafts. Explore our public galleries
          or log in to access exclusive members-only content.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/projects"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition"
          >
            View Projects
          </Link>
          <Link
            href="/crafts"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition"
          >
            View Crafts
          </Link>
          {user ? (
            <Link
              href="/members"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              Members Area
            </Link>
          ) : (
            <Link
              href="/login"
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              Login
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🔨</div>
            <h3 className="text-xl font-semibold mb-2">Projects</h3>
            <p className="text-gray-600">
              Browse through our collection of software and hardware projects
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-semibold mb-2">Crafts</h3>
            <p className="text-gray-600">
              Discover handmade crafts and creative works
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Members Only</h3>
            <p className="text-gray-600">
              Access exclusive content, tutorials, and behind-the-scenes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
