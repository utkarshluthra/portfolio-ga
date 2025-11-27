import { NextResponse } from 'next/server';
import { getProfile, updateProfile } from '@/lib/data';

export async function GET() {
    try {
        const data = await getProfile();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        updateProfile(body);
        return NextResponse.json({ message: 'Profile updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
    }
}
