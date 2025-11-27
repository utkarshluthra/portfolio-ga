'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, PlayCircle } from 'lucide-react';

interface FeaturedProps {
    posts: any[];
}

export default function Featured({ posts }: FeaturedProps) {
    // Filter for featured posts (mock logic for now, take first 2)
    const featuredPosts = posts.slice(0, 2);

    return (
        <section className="py-32 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Featured Insights</h2>
                        <p className="text-xl text-gray-600">Selected writings and videos.</p>
                    </div>
                    <Link href="/blog" className="hidden md:flex items-center px-6 py-2 bg-white border border-gray-200 rounded-full text-foreground font-medium hover:border-primary hover:text-primary transition-all shadow-sm">
                        View all <ArrowRight size={16} className="ml-2" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {featuredPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <Link href={`/blog/${post.slug}`}>
                                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                                    <div className="aspect-video bg-gray-100 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-8 flex-grow">
                                        <div className="flex items-center gap-3 text-sm font-medium mb-4">
                                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">Article</span>
                                            <span className="text-gray-400">{post.date}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{post.title}</h3>
                                        <p className="text-gray-600 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                    {/* Placeholder Video Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="group cursor-pointer"
                    >
                        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                            <div className="aspect-video bg-gray-900 overflow-hidden relative flex items-center justify-center">
                                <PlayCircle size={64} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all relative z-10" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                            </div>
                            <div className="p-8 flex-grow">
                                <div className="flex items-center gap-3 text-sm font-medium mb-4">
                                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full">Video</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-secondary transition-colors">Building Medoc Health: The Journey</h3>
                                <p className="text-gray-600 leading-relaxed">A look behind the scenes of building a digital healthcare platform.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-12 md:hidden text-center">
                    <Link href="/blog" className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 rounded-full text-foreground font-medium hover:border-primary hover:text-primary transition-all shadow-sm">
                        View all <ArrowRight size={16} className="ml-2" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
