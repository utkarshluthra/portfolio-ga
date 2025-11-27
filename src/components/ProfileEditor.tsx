'use client';

import { useState } from 'react';
import { Plus, Trash, Save } from 'lucide-react';

interface ProfileEditorProps {
    profile: any;
    onSave: (profile: any) => void;
    isLoading?: boolean;
}

export default function ProfileEditor({ profile, onSave, isLoading = false }: ProfileEditorProps) {
    const [data, setData] = useState(profile);

    const handleSave = () => {
        onSave(data);
    };

    const updateField = (field: string, value: any) => {
        setData({ ...data, [field]: value });
    };

    const updateArrayItem = (arrayName: string, index: number, field: string, value: any) => {
        const currentArray = data[arrayName] || [];
        const newArray = [...currentArray];
        newArray[index] = { ...newArray[index], [field]: value };
        setData({ ...data, [arrayName]: newArray });
    };

    const addItem = (arrayName: string, template: any) => {
        const currentArray = data[arrayName] || [];
        setData({ ...data, [arrayName]: [...currentArray, { ...template, id: Date.now().toString() }] });
    };

    const removeItem = (arrayName: string, index: number) => {
        const currentArray = data[arrayName] || [];
        const newArray = [...currentArray];
        newArray.splice(index, 1);
        setData({ ...data, [arrayName]: newArray });
    };

    return (
        <div className="space-y-12">
            {/* Basic Info */}
            <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold mb-6">Basic Information</h2>
                <div className="grid gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => updateField('title', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Bio</label>
                        <textarea
                            value={data.bio}
                            onChange={(e) => updateField('bio', e.target.value)}
                            className="w-full p-2 border rounded h-32"
                        />
                    </div>
                </div>
            </section>

            {/* Experience */}
            <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Experience</h2>
                    <button
                        onClick={() => addItem('experience', { role: '', company: '', period: '', description: '' })}
                        className="flex items-center gap-2 text-primary hover:bg-primary/10 px-3 py-1 rounded transition-colors"
                    >
                        <Plus size={16} /> Add
                    </button>
                </div>
                <div className="space-y-6">
                    {data.experience?.map((item: any, index: number) => (
                        <div key={item.id} className="p-4 border rounded-lg relative group">
                            <button
                                onClick={() => removeItem('experience', index)}
                                className="absolute top-4 right-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash size={16} />
                            </button>
                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        placeholder="Role"
                                        value={item.role}
                                        onChange={(e) => updateArrayItem('experience', index, 'role', e.target.value)}
                                        className="p-2 border rounded"
                                    />
                                    <input
                                        placeholder="Company"
                                        value={item.company}
                                        onChange={(e) => updateArrayItem('experience', index, 'company', e.target.value)}
                                        className="p-2 border rounded"
                                    />
                                </div>
                                <input
                                    placeholder="Period"
                                    value={item.period}
                                    onChange={(e) => updateArrayItem('experience', index, 'period', e.target.value)}
                                    className="p-2 border rounded"
                                />
                                <textarea
                                    placeholder="Description"
                                    value={item.description}
                                    onChange={(e) => updateArrayItem('experience', index, 'description', e.target.value)}
                                    className="p-2 border rounded h-24"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects */}
            <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Projects</h2>
                    <button
                        onClick={() => addItem('projects', { title: '', description: '', link: '', tags: [] })}
                        className="flex items-center gap-2 text-primary hover:bg-primary/10 px-3 py-1 rounded transition-colors"
                    >
                        <Plus size={16} /> Add
                    </button>
                </div>
                <div className="space-y-6">
                    {data.projects?.map((item: any, index: number) => (
                        <div key={item.id} className="p-4 border rounded-lg relative group">
                            <button
                                onClick={() => removeItem('projects', index)}
                                className="absolute top-4 right-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash size={16} />
                            </button>
                            <div className="grid gap-4">
                                <input
                                    placeholder="Title"
                                    value={item.title}
                                    onChange={(e) => updateArrayItem('projects', index, 'title', e.target.value)}
                                    className="p-2 border rounded"
                                />
                                <textarea
                                    placeholder="Description"
                                    value={item.description}
                                    onChange={(e) => updateArrayItem('projects', index, 'description', e.target.value)}
                                    className="p-2 border rounded h-24"
                                />
                                <input
                                    placeholder="Link"
                                    value={item.link}
                                    onChange={(e) => updateArrayItem('projects', index, 'link', e.target.value)}
                                    className="p-2 border rounded"
                                />
                                <input
                                    placeholder="Tags (comma separated)"
                                    value={item.tags.join(', ')}
                                    onChange={(e) => updateArrayItem('projects', index, 'tags', e.target.value.split(',').map((t: string) => t.trim()))}
                                    className="p-2 border rounded"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Certifications */}
            <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Certifications</h2>
                    <button
                        onClick={() => addItem('certifications', { title: '', issuer: '', date: '' })}
                        className="flex items-center gap-2 text-primary hover:bg-primary/10 px-3 py-1 rounded transition-colors"
                    >
                        <Plus size={16} /> Add
                    </button>
                </div>
                <div className="space-y-6">
                    {data.certifications?.map((item: any, index: number) => (
                        <div key={item.id} className="p-4 border rounded-lg relative group">
                            <button
                                onClick={() => removeItem('certifications', index)}
                                className="absolute top-4 right-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash size={16} />
                            </button>
                            <div className="grid gap-4">
                                <input
                                    placeholder="Title"
                                    value={item.title}
                                    onChange={(e) => updateArrayItem('certifications', index, 'title', e.target.value)}
                                    className="p-2 border rounded"
                                />
                                <input
                                    placeholder="Issuer"
                                    value={item.issuer}
                                    onChange={(e) => updateArrayItem('certifications', index, 'issuer', e.target.value)}
                                    className="p-2 border rounded"
                                />
                                <input
                                    placeholder="Date"
                                    value={item.date}
                                    onChange={(e) => updateArrayItem('certifications', index, 'date', e.target.value)}
                                    className="p-2 border rounded"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="fixed bottom-8 right-8">
                <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className={`flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg transition-all hover:scale-105 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Saving...' : <><Save size={20} /> Save Changes</>}
                </button>
            </div>
        </div>
    );
}
