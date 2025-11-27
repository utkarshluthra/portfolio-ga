'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Twitter } from 'lucide-react';
import Link from 'next/link';

interface Socials {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
}

interface ContactProps {
    socials: Socials;
}

export default function Contact({ socials }: ContactProps) {
    return (
        <section id="contact" className="py-32 bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-block px-4 py-1.5 mb-6 border border-primary/20 rounded-full bg-primary/5">
                        <span className="text-sm font-semibold text-primary tracking-wide uppercase">
                            Get in Touch
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">Let's Work Together</h2>
                    <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link
                            href="mailto:contact@utkarshluthra.com"
                            className="flex flex-col items-center justify-center p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 transition-all group"
                        >
                            <div className="p-4 bg-primary/5 text-primary rounded-full mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                <Mail size={24} />
                            </div>
                            <span className="font-medium text-gray-900">Email</span>
                        </Link>

                        {socials.linkedin && (
                            <Link
                                href={socials.linkedin}
                                target="_blank"
                                className="flex flex-col items-center justify-center p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-[#0077b5]/30 hover:-translate-y-1 transition-all group"
                            >
                                <div className="p-4 bg-[#0077b5]/5 text-[#0077b5] rounded-full mb-4 group-hover:bg-[#0077b5] group-hover:text-white transition-colors">
                                    <Linkedin size={24} />
                                </div>
                                <span className="font-medium text-gray-900">LinkedIn</span>
                            </Link>
                        )}

                        {socials.github && (
                            <Link
                                href={socials.github}
                                target="_blank"
                                className="flex flex-col items-center justify-center p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-gray-400 hover:-translate-y-1 transition-all group"
                            >
                                <div className="p-4 bg-gray-100 text-gray-900 rounded-full mb-4 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                                    <Github size={24} />
                                </div>
                                <span className="font-medium text-gray-900">GitHub</span>
                            </Link>
                        )}

                        {socials.twitter && (
                            <Link
                                href={socials.twitter}
                                target="_blank"
                                className="flex flex-col items-center justify-center p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-[#1DA1F2]/30 hover:-translate-y-1 transition-all group"
                            >
                                <div className="p-4 bg-[#1DA1F2]/5 text-[#1DA1F2] rounded-full mb-4 group-hover:bg-[#1DA1F2] group-hover:text-white transition-colors">
                                    <Twitter size={24} />
                                </div>
                                <span className="font-medium text-gray-900">Twitter</span>
                            </Link>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
