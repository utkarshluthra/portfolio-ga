'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

interface Certification {
    id: string;
    title: string;
    issuer: string;
    date: string;
}

interface CertificationsProps {
    certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
    if (!certifications || certifications.length === 0) return null;

    return (
        <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Certifications</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Continuous learning and professional development.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
                    {certifications.map((cert) => (
                        <motion.div
                            key={cert.id}
                            variants={{
                                hidden: { opacity: 0, scale: 0.9 },
                                show: { opacity: 1, scale: 1 }
                            }}
                            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all group flex items-start gap-6"
                        >
                            <div className="p-4 bg-primary/5 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                                <Award size={28} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">{cert.title}</h3>
                                <p className="text-gray-600 font-medium mb-1">{cert.issuer}</p>
                                <p className="text-gray-400 text-sm">{cert.date}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
