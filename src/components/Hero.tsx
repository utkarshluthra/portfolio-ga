'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Magnetic from './Magnetic';

interface HeroProps {
    name: string;
    title: string;
    bio: string;
}

export default function Hero({ name, title, bio }: HeroProps) {
    return (
        <section className="min-h-screen flex items-center justify-center pt-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-block px-4 py-1.5 mb-6 border border-primary/20 rounded-full bg-primary/5">
                            <span className="text-sm font-semibold text-primary tracking-wide uppercase">
                                Available for hire
                            </span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight text-foreground leading-[1.1]">
                            Hello, I'm <br />
                            <span className="text-primary">{name}</span>.
                        </h1>

                        <p className="text-2xl md:text-3xl text-gray-800 font-medium mb-6">
                            {title}
                        </p>

                        <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
                            {bio}
                        </p>

                        <div className="flex flex-col sm:flex-row items-start gap-4">
                            <Magnetic>
                                <Link
                                    href="#projects"
                                    className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold text-lg transition-all flex items-center gap-2 group shadow-xl shadow-primary/20 hover:scale-105"
                                >
                                    View My Work
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Magnetic>
                            <Magnetic>
                                <Link
                                    href="#contact"
                                    className="px-8 py-4 bg-white border border-gray-200 hover:border-primary/50 text-foreground hover:text-primary rounded-full font-semibold text-lg transition-all shadow-sm hover:shadow-md block"
                                >
                                    Contact Me
                                </Link>
                            </Magnetic>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative w-[450px] h-[550px] mx-auto">
                            <div className="absolute inset-0 bg-primary/10 rounded-[2rem] transform rotate-6 scale-95" />
                            <div className="absolute inset-0 bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
                                <img src="/profile.png" alt="Utkarsh Luthra" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
