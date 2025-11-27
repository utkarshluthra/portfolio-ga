'use client';

import { useState } from 'react';
import { Plus, Image as ImageIcon, Type, Quote, X, MoveUp, MoveDown } from 'lucide-react';

interface Block {
    id: string;
    type: 'paragraph' | 'heading' | 'image' | 'quote';
    value: string;
    caption?: string;
}

interface EditorProps {
    blocks: Block[];
    onChange: (blocks: Block[]) => void;
}

export default function BlockEditor({ blocks, onChange }: EditorProps) {
    const addBlock = (type: Block['type']) => {
        const newBlock: Block = {
            id: Date.now().toString(),
            type,
            value: '',
        };
        onChange([...blocks, newBlock]);
    };

    const updateBlock = (id: string, updates: Partial<Block>) => {
        onChange(blocks.map(b => b.id === id ? { ...b, ...updates } : b));
    };

    const removeBlock = (id: string) => {
        onChange(blocks.filter(b => b.id !== id));
    };

    const moveBlock = (index: number, direction: 'up' | 'down') => {
        const newBlocks = [...blocks];
        if (direction === 'up' && index > 0) {
            [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
        } else if (direction === 'down' && index < newBlocks.length - 1) {
            [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
        }
        onChange(newBlocks);
    };

    return (
        <div className="space-y-4">
            {blocks.map((block, index) => (
                <div key={block.id} className="group relative bg-white p-4 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors">
                    <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button type="button" onClick={() => moveBlock(index, 'up')} className="p-1 hover:bg-gray-100 rounded"><MoveUp size={14} /></button>
                        <button type="button" onClick={() => moveBlock(index, 'down')} className="p-1 hover:bg-gray-100 rounded"><MoveDown size={14} /></button>
                        <button type="button" onClick={() => removeBlock(block.id)} className="p-1 hover:bg-red-50 text-red-500 rounded"><X size={14} /></button>
                    </div>

                    {block.type === 'heading' && (
                        <input
                            type="text"
                            value={block.value}
                            onChange={(e) => updateBlock(block.id, { value: e.target.value })}
                            placeholder="Heading..."
                            className="w-full text-2xl font-bold border-none focus:outline-none focus:ring-0 bg-transparent"
                        />
                    )}

                    {block.type === 'paragraph' && (
                        <textarea
                            value={block.value}
                            onChange={(e) => updateBlock(block.id, { value: e.target.value })}
                            placeholder="Type your text..."
                            className="w-full min-h-[100px] resize-y border-none focus:outline-none focus:ring-0 bg-transparent"
                        />
                    )}

                    {block.type === 'quote' && (
                        <div className="flex gap-4">
                            <div className="w-1 bg-primary rounded-full" />
                            <textarea
                                value={block.value}
                                onChange={(e) => updateBlock(block.id, { value: e.target.value })}
                                placeholder="Quote..."
                                className="w-full min-h-[80px] resize-y border-none focus:outline-none focus:ring-0 bg-transparent italic text-lg"
                            />
                        </div>
                    )}

                    {block.type === 'image' && (
                        <div className="space-y-2">
                            <input
                                type="text"
                                value={block.value}
                                onChange={(e) => updateBlock(block.id, { value: e.target.value })}
                                placeholder="Image URL..."
                                className="w-full p-2 border border-gray-200 rounded text-sm"
                            />
                            {block.value && (
                                <div className="relative aspect-video bg-gray-100 rounded overflow-hidden">
                                    <img src={block.value} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                            <input
                                type="text"
                                value={block.caption || ''}
                                onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
                                placeholder="Caption (optional)"
                                className="w-full p-2 border-b border-gray-100 text-xs text-center"
                            />
                        </div>
                    )}
                </div>
            ))}

            <div className="flex gap-2 justify-center py-4 border-t border-dashed border-gray-300">
                <button type="button" onClick={() => addBlock('heading')} className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition-colors">
                    <Type size={16} /> Heading
                </button>
                <button type="button" onClick={() => addBlock('paragraph')} className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition-colors">
                    <Plus size={16} /> Text
                </button>
                <button type="button" onClick={() => addBlock('quote')} className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition-colors">
                    <Quote size={16} /> Quote
                </button>
                <button type="button" onClick={() => addBlock('image')} className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition-colors">
                    <ImageIcon size={16} /> Image
                </button>
            </div>
        </div>
    );
}
