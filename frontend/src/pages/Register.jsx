import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from '../context/globalContext';

const Register = () => {
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '' });
    const { setError, setUser } = useGlobalContext();
    const navigate = useNavigate();

    const handleInput = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/v1/auth/register', credentials);
            setUser(res.data);
            navigate('/dashboard');
        } catch (error) {
             setError(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div className="card" style={{ width: '400px', padding: '3rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Create Account</h2>
                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input className="input-control" type="text" name="name" placeholder="Full Name" onChange={handleInput} required style={{ width: '100%' }} />
                    <input className="input-control" type="email" name="email" placeholder="Email" onChange={handleInput} required style={{ width: '100%' }} />
                    <input className="input-control" type="password" name="password" placeholder="Password" onChange={handleInput} required style={{ width: '100%' }} />
                    <button type="submit" className="btn">Register</button>
                </form>
                <p style={{ marginTop: '1rem', textAlign: 'center', cursor: 'pointer', color: 'var(--primary)' }} onClick={() => navigate('/login')}>Already have an account? Login</p>
            </div>
        </div>
    );
};

export default Register;
