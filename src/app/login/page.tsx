import LoginForm from '@/components/LoginForm';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Login() {
  const user = await getCurrentUser();

  if (user) {
    redirect('/');
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Login
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            Access members-only content
          </p>

          <LoginForm />

        </div>
      </div>
    </div>
  );
}
