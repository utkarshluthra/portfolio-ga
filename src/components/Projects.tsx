'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';

interface ProjectItem {
    id: string;
    title: string;
    description: string;
    link?: string;
    github?: string;
    tags: string[];
}

interface ProjectsProps {
    projects: ProjectItem[];
}

export default function Projects({ projects }: ProjectsProps) {
    return (
        <section id="projects" className="py-32 bg-muted/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Featured Work</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        A selection of projects that showcase my technical skills and creative problem-solving.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.title}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                show: { opacity: 1, y: 0 }
                            }}
                            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
                        >
                            <div className="p-8 flex-grow flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <Link
                                        href={project.link || project.github || '#'}
                                        target="_blank"
                                        className="p-2 bg-gray-50 text-gray-400 rounded-full group-hover:bg-primary group-hover:text-white transition-all"
                                    >
                                        <ExternalLink size={20} />
                                    </Link>
                                </div>

                                <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
