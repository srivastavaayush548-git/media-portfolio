import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { api } from '../../api';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { data } = await api.post('/auth/login', {
                username,
                password
            });

            login(data);
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)'
        }}>
            <form onSubmit={handleSubmit} style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                padding: '40px',
                borderRadius: '20px',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                width: '100%',
                maxWidth: '400px',
                color: 'white'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Admin Login</h2>

                {error && <div style={{
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                    padding: '10px',
                    borderRadius: '5px',
                    marginBottom: '20px',
                    textAlign: 'center',
                    border: '1px solid red'
                }}>{error}</div>}

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: 'none',
                            background: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            outline: 'none'
                        }}
                        required
                    />
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: 'none',
                            background: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            outline: 'none'
                        }}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#fdbb2d',
                        color: '#1a2a6c',
                        fontWeight: 'bold',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'transform 0.2s',
                        fontSize: '16px'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
