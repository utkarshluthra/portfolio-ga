'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BookSection() {
    return (
        <section className="py-32 bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-2 md:order-1"
                    >
                        <div className="inline-block px-4 py-1.5 mb-6 border border-secondary/20 rounded-full bg-secondary/5">
                            <span className="text-sm font-semibold text-secondary tracking-wide uppercase">
                                My Book
                            </span>
                        </div>

                        <h3 className="text-5xl font-bold mb-6 text-foreground leading-tight">
                            Decoding Life
                        </h3>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            A collection of thoughts and perspectives on navigating the complexities of modern life, entrepreneurship, and personal growth.
                        </p>

                        <Link
                            href="#"
                            className="inline-flex items-center px-6 py-3 bg-secondary text-white rounded-full font-medium hover:bg-secondary/90 transition-all group shadow-lg shadow-secondary/20"
                        >
                            Get your copy <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, rotateY: 90 }}
                        whileInView={{ opacity: 1, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-1 md:order-2 flex justify-center perspective-1000"
                    >
                        <div className="relative w-72 h-[450px] bg-white shadow-2xl rounded-r-lg transform rotate-y-12 hover:rotate-y-0 transition-transform duration-500 border-l-8 border-gray-100 group">
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 overflow-hidden rounded-r-lg">
                                <img src="/book_cover_placeholder.png" alt="Book Cover" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
