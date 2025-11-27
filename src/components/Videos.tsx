'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Reveal } from './Reveal';

interface Video {
    id: string;
    title: string;
    url: string;
    description: string | null;
}

interface VideosProps {
    videos: Video[];
}

export default function Videos({ videos }: VideosProps) {
    if (!videos || videos.length === 0) return null;

    const getEmbedUrl = (url: string) => {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = url.split('v=')[1] || url.split('/').pop();
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    };

    return (
        <section id="videos" className="py-32 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal width="100%">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Featured Videos</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Talks, tutorials, and demos.
                        </p>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {videos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <div className="aspect-video w-full bg-gray-100 relative">
                                <iframe
                                    src={getEmbedUrl(video.url)}
                                    title={video.title}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                                    {video.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {video.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
