import { getPost, getPosts } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post: any) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
            <Link
                href="/blog"
                className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors group"
            >
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Blog
            </Link>

            <header className="mb-12 text-center">
                <div className="text-primary font-medium mb-4">{post.date}</div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif leading-tight">{post.title}</h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">{post.excerpt}</p>
            </header>

            <div className="prose prose-lg max-w-none prose-headings:font-serif prose-a:text-primary hover:prose-a:text-primary/80">
                {Array.isArray(post.content) ? (
                    post.content.map((block: any) => (
                        <div key={block.id} className="mb-8">
                            {block.type === 'heading' && <h2 className="text-3xl font-bold mt-12 mb-6">{block.value}</h2>}
                            {block.type === 'paragraph' && <p className="text-gray-700 leading-relaxed">{block.value}</p>}
                            {block.type === 'quote' && (
                                <blockquote className="border-l-4 border-primary pl-6 italic text-xl text-gray-800 my-8">
                                    "{block.value}"
                                </blockquote>
                            )}
                            {block.type === 'image' && (
                                <figure className="my-8">
                                    <img src={block.value} alt={block.caption || ''} className="w-full rounded-xl shadow-lg" />
                                    {block.caption && <figcaption className="text-center text-sm text-gray-500 mt-2">{block.caption}</figcaption>}
                                </figure>
                            )}
                        </div>
                    ))
                ) : (
                    // Fallback for old string content
                    post.content.split('\n').map((paragraph: string, index: number) => (
                        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                            {paragraph}
                        </p>
                    ))
                )}
            </div>
        </article>
    );
}
