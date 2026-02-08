import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const filePath = join(process.cwd(), 'data', 'member-files.json');
    const data = JSON.parse(readFileSync(filePath, 'utf-8'));

    return NextResponse.json({
      user,
      files: data.files || []
    });
  } catch (error) {
    console.error('Error loading members data:', error);
    return NextResponse.json(
      { error: 'Error loading data' },
      { status: 500 }
    );
  }
}
