// app/api/getGlbFiles/route.ts

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  const glbDir = path.join(process.cwd(), 'public', 'assets', 'models');

  try {
    if (!fs.existsSync(glbDir)) {
      return NextResponse.json({ files: [] });
    }
    const files = await fs.promises.readdir(glbDir);
    const glbFiles = files.filter(file => file.endsWith('.glb'));
    return NextResponse.json({ files: glbFiles });
  } catch (err) {
    return NextResponse.json({ files: [] });
  }
}
