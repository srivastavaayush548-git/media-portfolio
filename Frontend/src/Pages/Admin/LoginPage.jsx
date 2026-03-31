import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { api } from '../../api';
import { Lock, User, Eye, EyeOff, ShieldCheck } from 'lucide-react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { data } = await api.post('/auth/login', { username, password });
            login(data);
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #78716c 1px, transparent 0)', backgroundSize: '32px 32px' }}
            />

            <div className="relative w-full max-w-md">
                {/* Card */}
                <div className="bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Top accent bar */}
                    <div className="h-1 w-full bg-gradient-to-r from-red-700 via-red-500 to-red-700" />

                    <div className="p-10">
                        {/* Logo / Icon */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-16 h-16 bg-red-700/20 border border-red-700/40 rounded-2xl flex items-center justify-center mb-4">
                                <ShieldCheck className="text-red-500 w-8 h-8" />
                            </div>
                            <h1 className="text-2xl font-serif font-bold text-white tracking-wide">Admin Portal</h1>
                            <p className="text-stone-500 text-sm mt-1">Sign in to manage your portfolio</p>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mb-6 px-4 py-3 bg-red-900/30 border border-red-700/50 rounded-lg text-red-400 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Username */}
                            <div>
                                <label className="block text-sm font-medium text-stone-400 mb-2">Username</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 w-4 h-4" />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full bg-stone-800 border border-stone-700 text-white placeholder-stone-600 rounded-lg pl-10 pr-4 py-3 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                                        placeholder="Enter username"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-stone-400 mb-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 w-4 h-4" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-stone-800 border border-stone-700 text-white placeholder-stone-600 rounded-lg pl-10 pr-12 py-3 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                                        placeholder="Enter password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-red-700 hover:bg-red-600 disabled:bg-red-900 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors mt-2 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Signing in...
                                    </>
                                ) : 'Sign In'}
                            </button>
                        </form>
                    </div>
                </div>

                <p className="text-center text-stone-600 text-xs mt-6">
                    Portfolio Management System &copy; {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
