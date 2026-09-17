import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import {CarConfig} from '@/models/CarConfig';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();

    await connectToDB();

    const newCar = await CarConfig.create({
      userId,
      carName: body.carName,
      config: body.config,
      isShared: body.isShared || false,
    });

    return NextResponse.json(newCar, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
