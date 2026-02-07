import { NextRequest, NextResponse } from 'next/server';
import { verifyUser } from '@/lib/users';
import { createToken, setAuthCookie } from '@/lib/auth';
import type { LoginRequest, LoginResponse } from '@/types/auth';

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      );
    }

    const user = await verifyUser(username, password);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = await createToken({
      id: user.id,
      username: user.username,
    });

    await setAuthCookie(token);

    const response: LoginResponse = {
      success: true,
      user: {
        id: user.id,
        username: user.username,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
