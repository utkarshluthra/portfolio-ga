import { NextResponse } from 'next/server';
import { getPosts, createPost } from '@/lib/data';

export async function GET() {
    try {
        const data = await getPosts();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read posts' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newPost = createPost(body);
        return NextResponse.json(newPost);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}
