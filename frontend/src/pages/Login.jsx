import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from '../context/globalContext';
import { WalletCards, Lock, Mail, ArrowRight } from 'lucide-react';

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
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>
             {/* Left Branding Side */}
             <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '4rem', background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(140, 82, 255, 0.1) 100%)', borderRight: '1px solid var(--border-color)', justifyContent: 'center' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--primary)', marginBottom: '2rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
                      <WalletCards size={40} />
                      <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>ExpanseTracker</h2>
                 </div>
                 <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Welcome back<br />to your financial<br />command center.</h1>
                 <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '400px' }}>Securely access your isolated data vault and manage your wealth from anywhere.</p>
             </div>

             {/* Right Login Form */}
             <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                 <div className="card animate-fade" style={{ width: '100%', maxWidth: '480px', padding: '3rem' }}>
                     <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>Login to Account</h2>
                     <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', textAlign: 'center' }}>Enter your credentials to continue.</p>
                     
                     <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                         <div style={{ position: 'relative' }}>
                             <Mail size={20} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-secondary)' }} />
                             <input className="input-control" type="email" name="email" placeholder="Email Address" onChange={handleInput} required style={{ width: '100%', padding: '0.9rem 1rem 0.9rem 3rem', margin: 0, fontSize: '16px' }} />
                         </div>
                         <div style={{ position: 'relative' }}>
                             <Lock size={20} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-secondary)' }} />
                             <input className="input-control" type="password" name="password" placeholder="Password" onChange={handleInput} required style={{ width: '100%', padding: '0.9rem 1rem 0.9rem 3rem', margin: 0, fontSize: '16px' }} />
                         </div>
                         
                         <div style={{ textAlign: 'right', marginTop: '-0.5rem' }}>
                             <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>Forgot Password?</a>
                         </div>

                         <button type="submit" className="btn" style={{ padding: '0.9rem', fontSize: '1.1rem', marginTop: '0.5rem' }}>
                             Sign In
                         </button>
                     </form>
                     
                     <div style={{ marginTop: '2.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                         Don't have an account? <span onClick={() => navigate('/register')} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }}>Register Here</span>
                     </div>
                 </div>
             </div>
        </div>
    );
};

export default Login;
