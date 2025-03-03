import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import os from "os"; // Import os module
import { extname, join } from "path";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false, error: "No file uploaded" });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate a unique filename using a timestamp and retain the original file extension
  const originalExtension = extname(file.name); // Extract the file extension
  const timestamp = Date.now(); // Get the current timestamp
  const uniqueFileName = `${timestamp}${originalExtension}`;

  // Use the /tmp directory for storing files on Vercel
  // const path = join("/tmp", uniqueFileName);
  // await writeFile(path, buffer);
  // console.log(`File uploaded to: ${path}`);

  // Use os.tmpdir() to get the system's temp directory
  const tempDir = os.tmpdir();
  const filePath = join(tempDir, uniqueFileName);

  await writeFile(filePath, buffer);
  console.log(`File uploaded to: ${filePath}`);

  // Since files in /tmp are not accessible via the browser, you may need to process or move them elsewhere

  return NextResponse.json({
    success: true,
    // fileName: path,
    fileName: filePath,
  });
}
