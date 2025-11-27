'use client';

import { motion } from 'framer-motion';

interface AboutProps {
    bio: string;
}

export default function About({ bio }: AboutProps) {
    return (
        <section id="about" className="py-32 bg-muted/30">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">About Me</h2>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
                    </div>

                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
                        <p className="text-xl text-gray-700 leading-relaxed mb-8 font-light">
                            {bio}
                        </p>
                        <p className="text-xl text-gray-700 leading-relaxed font-light">
                            I am passionate about leveraging technology to solve real-world problems. My journey in software engineering and entrepreneurship has been driven by a desire to create impactful solutions, particularly in the healthcare sector.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
