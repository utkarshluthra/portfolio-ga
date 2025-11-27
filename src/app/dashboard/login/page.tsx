'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple hardcoded password for demo purposes
        if (password === 'admin123') {
            localStorage.setItem('isAuthenticated', 'true');
            router.push('/dashboard');
        } else {
            alert('Invalid password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <form onSubmit={handleLogin} className="bg-white/5 p-8 rounded-xl border border-white/10 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full p-3 bg-black/20 border border-white/10 rounded-lg mb-4 focus:outline-none focus:border-primary text-white"
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
