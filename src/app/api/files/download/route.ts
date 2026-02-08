import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { readFileSync, existsSync, statSync, createReadStream } from 'fs';
import { join, resolve, extname } from 'path';

// Allowed file categories
const ALLOWED_CATEGORIES = ['documents', 'images', 'videos', 'resources'];

// MIME type mapping
const MIME_TYPES: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.txt': 'text/plain',
  '.zip': 'application/zip',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.avi': 'video/x-msvideo',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
};

interface MemberFile {
  id: string;
  name: string;
  description: string;
  category: string;
  filename: string;
  uploadDate: string;
  size: string;
}

interface FileMetadata {
  files: MemberFile[];
}

export async function GET(request: NextRequest) {
  try {
    // 1. Authentication check
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // 2. Extract and validate query parameters
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const filename = searchParams.get('filename');

    if (!category || !filename) {
      return NextResponse.json(
        { error: 'Missing category or filename parameter' },
        { status: 400 }
      );
    }

    // 3. Validate category
    if (!ALLOWED_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    // 4. Sanitize filename to prevent path traversal
    // Check for path traversal attempts
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\') || filename.includes('\0')) {
      return NextResponse.json(
        { error: 'Invalid filename' },
        { status: 400 }
      );
    }

    // 5. Load and validate file metadata
    const metadataPath = join(process.cwd(), 'data', 'member-files.json');
    let metadata: FileMetadata;

    try {
      const metadataContent = readFileSync(metadataPath, 'utf-8');
      metadata = JSON.parse(metadataContent);
    } catch (error) {
      console.error('Error loading file metadata:', error);
      return NextResponse.json(
        { error: 'Error loading file metadata' },
        { status: 500 }
      );
    }

    // 6. Verify file exists in metadata
    const fileExists = metadata.files.some(
      (f) => f.category === category && f.filename === filename
    );

    if (!fileExists) {
      return NextResponse.json(
        { error: 'File not found in metadata' },
        { status: 404 }
      );
    }

    // 7. Construct and validate file path
    const baseDir = join(process.cwd(), 'data', 'member-files');
    const filePath = join(baseDir, category, filename);
    const resolvedPath = resolve(filePath);
    const resolvedBaseDir = resolve(baseDir);

    // Ensure the resolved path is within the base directory
    if (!resolvedPath.startsWith(resolvedBaseDir)) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 400 }
      );
    }

    // 8. Check if file exists on disk
    if (!existsSync(resolvedPath)) {
      return NextResponse.json(
        { error: 'File not found on disk' },
        { status: 404 }
      );
    }

    // 9. Get file stats
    const stats = statSync(resolvedPath);
    if (!stats.isFile()) {
      return NextResponse.json(
        { error: 'Not a file' },
        { status: 400 }
      );
    }

    // 10. Determine MIME type
    const ext = extname(filename).toLowerCase();
    const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

    // 11. Read file and create response
    const fileBuffer = readFileSync(resolvedPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': stats.size.toString(),
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'private, max-age=3600',
      },
    });

  } catch (error) {
    console.error('Error in file download:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
