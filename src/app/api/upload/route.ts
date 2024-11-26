import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join, extname } from 'path';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file uploaded' });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate a unique filename using a timestamp and retain the original file extension
  const originalExtension = extname(file.name); // Extract the file extension
  const timestamp = Date.now(); // Get the current timestamp
  const uniqueFileName = `${timestamp}${originalExtension}`;

  const path = join(process.cwd(), 'public/uploads', uniqueFileName);
  await writeFile(path, buffer);
  console.log(`File uploaded to: ${path}`);

  return NextResponse.json({
    success: true,
    fileName: `/uploads/${uniqueFileName}`,
  });
}
