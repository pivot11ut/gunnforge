'use client';

import { useState, useEffect } from 'react';

interface MemberFile {
  id: string;
  name: string;
  description: string;
  category: string;
  filename: string;
  uploadDate: string;
  size: string;
}

interface User {
  username: string;
}

export default function Members() {
  const [user, setUser] = useState<User | null>(null);
  const [files, setFiles] = useState<MemberFile[]>([]);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/api/members/data');
        const data = await response.json();
        setUser(data.user);
        setFiles(data.files);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
    loadData();
  }, []);

  const handleDownload = async (file: MemberFile) => {
    try {
      setDownloading(file.id);
      const response = await fetch(
        `/api/files/download?category=${encodeURIComponent(file.category)}&filename=${encodeURIComponent(file.filename)}`
      );

      if (!response.ok) {
        const error = await response.json();
        alert(`Download failed: ${error.error || 'Unknown error'}`);
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      alert('Download failed. Please try again.');
    } finally {
      setDownloading(null);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'documents': return '📄';
      case 'images': return '🖼️';
      case 'videos': return '🎬';
      case 'resources': return '📦';
      default: return '📁';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to the Members Area
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Hello, <span className="font-semibold text-purple-600">{user?.username}</span>!
          You have access to exclusive members-only content.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border-l-4 border-purple-500 bg-purple-50 p-6 rounded">
            <h3 className="text-xl font-semibold mb-3">🎓 Exclusive Tutorials</h3>
            <p className="text-gray-700">
              Step-by-step guides for advanced projects and techniques not available to the public.
            </p>
          </div>

          <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded">
            <h3 className="text-xl font-semibold mb-3">📦 Project Files</h3>
            <p className="text-gray-700">
              Download source code, CAD files, and design templates for all projects.
            </p>
          </div>

          <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded">
            <h3 className="text-xl font-semibold mb-3">🎬 Behind the Scenes</h3>
            <p className="text-gray-700">
              Watch videos showing the full creation process, including failures and lessons learned.
            </p>
          </div>

          <div className="border-l-4 border-orange-500 bg-orange-50 p-6 rounded">
            <h3 className="text-xl font-semibold mb-3">💬 Community Forum</h3>
            <p className="text-gray-700">
              Connect with other members, share ideas, and get feedback on your own projects.
            </p>
          </div>
        </div>

        {/* File Downloads Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📥 Member Downloads</h2>
          <p className="text-gray-600 mb-6">
            Exclusive files, resources, and materials available only to members.
          </p>

          {files.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <p className="text-gray-500">No files available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-4xl">{getCategoryIcon(file.category)}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {file.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {file.description}
                        </p>
                        <div className="flex gap-4 text-xs text-gray-500">
                          <span>📅 {file.uploadDate}</span>
                          <span>💾 {file.size}</span>
                          <span className="capitalize">📂 {file.category}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(file)}
                      disabled={downloading === file.id}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium whitespace-nowrap"
                    >
                      {downloading === file.id ? 'Downloading...' : 'Download'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">🎉 Thank you for being a member!</h2>
          <p className="text-lg">
            Your support helps make more amazing projects possible. Stay tuned for new content!
          </p>
        </div>
      </div>
    </div>
  );
}
