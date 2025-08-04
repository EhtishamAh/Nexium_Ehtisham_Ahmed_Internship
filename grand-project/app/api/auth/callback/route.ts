// /app/api/result/[id]/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import PitchDocument from '@/models/PitchDocument';
import { createClient } from '@/utils/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Ensure a user is logged in
    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    await dbConnect();

    // Find the document ensuring the logged-in user owns it
    const pitch = await PitchDocument.findOne({ 
      pitchId: params.id, 
      userId: user.id 
    }).lean();

    if (!pitch) {
      return new NextResponse(JSON.stringify({ error: 'Not Found' }), { status: 404 });
    }

    return NextResponse.json(pitch);

  } catch (error) {
    console.error('API Error:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}