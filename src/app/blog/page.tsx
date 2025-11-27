import Link from 'next/link';
import { getPosts } from '@/lib/data';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

export default async function Blog() {
    const posts = await getPosts();
    const featuredPost = posts.find((p: any) => p.isFeatured) || posts[0];
    const otherPosts = posts.filter((p: any) => p.id !== featuredPost?.id);

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Thoughts & Insights</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Exploring the intersection of technology, entrepreneurship, and life.
                </p>
            </div>

            {/* Featured Post */}
            {featuredPost && (
                <div className="mb-20">
                    <Link href={`/blog/${featuredPost.slug}`} className="group block">
                        <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative">
                                {/* Placeholder for featured image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 text-sm text-primary font-medium mb-4">
                                    <span className="px-3 py-1 bg-primary/10 rounded-full">Featured</span>
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {featuredPost.date}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-gray-600 text-lg mb-6 line-clamp-3">
                                    {featuredPost.excerpt}
                                </p>
                                <span className="inline-flex items-center text-primary font-bold group-hover:translate-x-2 transition-transform">
                                    Read Article <ArrowRight size={20} className="ml-2" />
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>
            )}

            {/* Post Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherPosts.map((post: any) => (
                    <Link
                        href={`/blog/${post.slug}`}
                        key={post.id}
                        className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                    >
                        <div className="aspect-[16/10] bg-gray-50 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-gray-100 group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                <Calendar size={14} />
                                <span>{post.date}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                            </h3>
                            <p className="text-gray-600 mb-6 flex-grow line-clamp-3 text-sm leading-relaxed">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center text-sm font-bold text-primary mt-auto">
                                Read More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
