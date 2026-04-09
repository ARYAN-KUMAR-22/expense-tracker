import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from '../context/globalContext';
import { WalletCards, Lock, Mail, User } from 'lucide-react';

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
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>
             {/* Left Branding Side */}
             <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '4rem', background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(45, 212, 191, 0.1) 100%)', borderRight: '1px solid var(--border-color)', justifyContent: 'center' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--primary)', marginBottom: '2rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
                      <WalletCards size={40} />
                      <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>ExpanseTracker</h2>
                 </div>
                 <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Start building<br />your financial<br />future today.</h1>
                 <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '400px' }}>Join thousands of users tracking their portfolios and expenses inside our secure platform.</p>
             </div>

             {/* Right Registration Form */}
             <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                 <div className="card animate-fade" style={{ width: '100%', maxWidth: '480px', padding: '3rem' }}>
                     <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>Create Account</h2>
                     <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', textAlign: 'center' }}>Sign up for free and start tracking.</p>
                     
                     <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                         <div style={{ position: 'relative' }}>
                             <User size={20} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-secondary)' }} />
                             <input className="input-control" type="text" name="name" placeholder="Full Name" onChange={handleInput} required style={{ width: '100%', padding: '0.9rem 1rem 0.9rem 3rem', margin: 0, fontSize: '16px' }} />
                         </div>
                         <div style={{ position: 'relative' }}>
                             <Mail size={20} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-secondary)' }} />
                             <input className="input-control" type="email" name="email" placeholder="Email Address" onChange={handleInput} required style={{ width: '100%', padding: '0.9rem 1rem 0.9rem 3rem', margin: 0, fontSize: '16px' }} />
                         </div>
                         <div style={{ position: 'relative' }}>
                             <Lock size={20} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-secondary)' }} />
                             <input className="input-control" type="password" name="password" placeholder="Password" onChange={handleInput} required style={{ width: '100%', padding: '0.9rem 1rem 0.9rem 3rem', margin: 0, fontSize: '16px' }} />
                         </div>
                         
                         <button type="submit" className="btn" style={{ marginTop: '0.5rem', padding: '0.9rem', fontSize: '1.1rem' }}>
                             Sign Up
                         </button>
                     </form>
                     
                     <div style={{ marginTop: '2.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                         Already have an account? <span onClick={() => navigate('/login')} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }}>Sign In Here</span>
                     </div>
                 </div>
             </div>
        </div>
    );
};

export default Register;
