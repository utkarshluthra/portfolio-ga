'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash, ArrowLeft, Layout, User } from 'lucide-react';
import BlockEditor from '@/components/BlockEditor';
import ProfileEditor from '@/components/ProfileEditor';

export default function Dashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'blog' | 'profile'>('blog');
    const [posts, setPosts] = useState<any[]>([]);
    const [profile, setProfile] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState<any>({
        title: '',
        slug: '',
        excerpt: '',
        content: [],
        date: '',
        isFeatured: false
    });

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
            router.push('/dashboard/login');
        }
        fetchPosts();
        fetchProfile();
    }, [router]);

    const fetchPosts = async () => {
        const res = await fetch('/api/posts');
        const data = await res.json();
        setPosts(data);
    };

    const fetchProfile = async () => {
        const res = await fetch('/api/profile');
        const data = await res.json();
        setProfile(data);
    };

    const [isLoading, setIsLoading] = useState(false);

    const handlePostSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const method = currentPost.id ? 'PUT' : 'POST';
            const url = currentPost.id ? `/api/posts/${currentPost.slug}` : '/api/posts';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...currentPost,
                    date: currentPost.date || new Date().toISOString().split('T')[0]
                }),
            });

            if (!res.ok) throw new Error('Failed to save post');

            setIsEditing(false);
            setCurrentPost({ title: '', slug: '', excerpt: '', content: [], date: '', isFeatured: false });
            fetchPosts();
        } catch (error) {
            alert('Error saving post');
        } finally {
            setIsLoading(false);
        }
    };

    const handleProfileSave = async (updatedProfile: any) => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProfile),
            });

            if (!res.ok) throw new Error('Failed to update profile');

            setProfile(updatedProfile);
            alert('Profile updated successfully!');
        } catch (error) {
            alert('Error updating profile');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (slug: string) => {
        if (confirm('Are you sure?')) {
            await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
            fetchPosts();
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab('blog')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${activeTab === 'blog' ? 'bg-white shadow-sm text-primary font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Layout size={18} /> Blog
                    </button>
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${activeTab === 'profile' ? 'bg-white shadow-sm text-primary font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <User size={18} /> Profile
                    </button>
                </div>
            </div>

            {activeTab === 'blog' && (
                <>
                    {!isEditing && (
                        <div className="flex justify-end mb-8">
                            <button
                                onClick={() => {
                                    setIsEditing(true);
                                    setCurrentPost({ title: '', slug: '', excerpt: '', content: [], date: '', isFeatured: false });
                                }}
                                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg flex items-center gap-2 transition-colors"
                            >
                                <Plus size={20} /> New Post
                            </button>
                        </div>
                    )}

                    {isEditing ? (
                        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg">
                            <div className="flex items-center gap-4 mb-6">
                                <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <ArrowLeft size={20} />
                                </button>
                                <h2 className="text-xl font-bold">{currentPost.id ? 'Edit Post' : 'New Post'}</h2>
                            </div>

                            <form onSubmit={handlePostSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">Title</label>
                                        <input
                                            type="text"
                                            value={currentPost.title}
                                            onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">Slug</label>
                                        <input
                                            type="text"
                                            value={currentPost.slug}
                                            onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700">Excerpt</label>
                                    <textarea
                                        value={currentPost.excerpt}
                                        onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-24 resize-none"
                                        required
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={currentPost.isFeatured || false}
                                        onChange={(e) => setCurrentPost({ ...currentPost, isFeatured: e.target.checked })}
                                        className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                                    />
                                    <label htmlFor="featured" className="text-sm font-medium text-gray-700">Feature this post</label>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-4 text-gray-700">Content</label>
                                    <BlockEditor
                                        blocks={Array.isArray(currentPost.content) ? currentPost.content : []}
                                        onChange={(blocks) => setCurrentPost({ ...currentPost, content: blocks })}
                                    />
                                </div>

                                <div className="flex gap-4 pt-4 border-t border-gray-100">
                                    <button
                                        type="submit"
                                        className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors"
                                    >
                                        Save Post
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {posts.map((post) => (
                                <div key={post.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center group">
                                    <div>
                                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{post.title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                            <span>{post.date}</span>
                                            {post.isFeatured && <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-xs rounded-full font-medium">Featured</span>}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => {
                                                setCurrentPost(post);
                                                setIsEditing(true);
                                            }}
                                            className="p-2 hover:bg-gray-100 rounded-lg text-blue-600"
                                        >
                                            <Edit size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.slug)}
                                            className="p-2 hover:bg-gray-100 rounded-lg text-red-500"
                                        >
                                            <Trash size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {activeTab === 'profile' && profile && (
                <ProfileEditor profile={profile} onSave={handleProfileSave} isLoading={isLoading} />
            )}
        </div>
    );
}
