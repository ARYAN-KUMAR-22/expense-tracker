import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from '../context/globalContext';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { setError, setUser } = useGlobalContext();
    const navigate = useNavigate();

    const handleInput = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/v1/auth/login', credentials);
            setUser(res.data);
            navigate('/dashboard');
        } catch (error) {
             setError(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div className="card" style={{ width: '400px', padding: '3rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Welcome Back</h2>
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input className="input-control" type="email" name="email" placeholder="Email" onChange={handleInput} required style={{ width: '100%' }} />
                    <input className="input-control" type="password" name="password" placeholder="Password" onChange={handleInput} required style={{ width: '100%' }} />
                    <button type="submit" className="btn">Login</button>
                </form>
                <p style={{ marginTop: '1rem', textAlign: 'center', cursor: 'pointer', color: 'var(--primary)' }} onClick={() => navigate('/register')}>Don't have an account? Register</p>
            </div>
        </div>
    );
};

export default Login;
