'use client';

import { motion } from 'framer-motion';

interface ExperienceItem {
    id: string;
    role: string;
    company: string;
    period: string;
    description: string;
}

interface ExperienceProps {
    experience: ExperienceItem[];
}

export default function Experience({ experience }: ExperienceProps) {
    return (
        <section id="experience" className="py-24 bg-muted/30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold mb-16 text-center text-primary"
                >
                    Professional Journey
                </motion.h2>

                <div className="relative">
                    {/* Central Line - Desktop */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />

                    {/* Left Line - Mobile */}
                    <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20" />

                    {experience.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative mb-12 md:mb-24 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                } md:flex items-center justify-between`}
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary border-4 border-white rounded-full shadow-sm -translate-x-1/2 z-10 mt-1.5 md:mt-0" />

                            {/* Spacer for opposite side on desktop */}
                            <div className="hidden md:block w-5/12" />

                            {/* Content Card */}
                            <div className={`pl-12 md:pl-0 w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                                }`}>
                                <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative
                  ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}
                `}>
                                    {/* Arrow pointing to dot (Desktop only) */}
                                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-t border-r border-gray-100 transform rotate-45
                      ${index % 2 === 0 ? '-right-2 border-t-primary/0 border-r-primary/0 border-b border-l' : '-left-2 border-b-primary/0 border-l-primary/0'}
                   `} />

                                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-3">
                                        {item.period}
                                    </span>
                                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{item.role}</h3>
                                    <h4 className="text-lg font-medium text-gray-500 mb-4">{item.company}</h4>
                                    <p className="text-gray-600 leading-relaxed text-sm">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
