import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WalletCards, ShieldCheck, PieChart, DownloadCloud, ArrowRight, Code, Moon, Sun } from 'lucide-react';
import { useGlobalContext } from '../context/globalContext';

const Landing = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useGlobalContext();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-dark)' }}>

            {/* Navbar */}
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 4rem', background: 'rgba(28, 30, 45, 0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--primary)', cursor: 'pointer' }}>
                    <WalletCards size={32} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>ExpanseTracker</h2>
                </div>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <a href="#features" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500', transition: '0.3s' }} className="nav-link">Features</a>
                    <a href="#about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500', transition: '0.3s' }} className="nav-link">About Us</a>
                    <button onClick={toggleTheme} style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center' }}>
                         {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button className="btn" onClick={() => navigate('/login')} style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--text-primary)' }}>Login</button>
                    <button className="btn" onClick={() => navigate('/register')}>Get Started</button>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '8rem 2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--primary) 0%, rgba(15,17,24,0) 70%)', opacity: 0.1, top: '-300px', left: '50%', transform: 'translateX(-50%)', zIndex: 0 }} />

                <h1 className="animate-fade" style={{ fontSize: '4.5rem', fontWeight: '800', lineHeight: '1.1', zIndex: 1, marginBottom: '1.5rem', background: 'linear-gradient(to right, #ffffff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Master Your Finances<br />With Precision
                </h1>
                <p className="animate-fade" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', zIndex: 1, marginBottom: '3rem', lineHeight: '1.6', animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
                    The ultimate premium financial management SPA. Track your incomes, manage your expenses, export CSV reports, and view dynamic graphs in real-time.
                </p>
                <div className="animate-fade" style={{ display: 'flex', gap: '1.5rem', zIndex: 1, animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
                    <button className="btn" onClick={() => navigate('/register')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                        Start Tracking Free <ArrowRight size={20} />
                    </button>
                    <button className="btn" onClick={() => navigate('/login')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', background: 'transparent', border: '2px solid var(--primary)', color: 'var(--text-primary)' }}>
                        View Demo
                    </button>
                </div>
            </section>

            {/* Features Cards Section */}
            <section id="features" style={{ padding: '5rem 4rem', background: 'var(--bg-card)' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Professional Grade Features</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Everything you need to take control of your wealth.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div className="card" style={{ transition: 'transform 0.3s ease, border-color 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                        <div style={{ background: 'rgba(140, 82, 255, 0.1)', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                            <ShieldCheck size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Role-Based Security</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Enterprise grade JWT authentication. Multi-tenant architecture ensuring your data is completely isolated and cryptographically secure.</p>
                    </div>
                    <div className="card" style={{ transition: 'transform 0.3s ease, border-color 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                        <div style={{ background: 'rgba(45, 212, 191, 0.1)', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)', marginBottom: '1.5rem' }}>
                            <PieChart size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Dynamic Visualizations</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Understand your spending habits at a glance with beautiful, interactive React-ChartJS line graphs updating in absolute real-time.</p>
                    </div>
                    <div className="card" style={{ transition: 'transform 0.3s ease, border-color 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                        <div style={{ background: 'rgba(251, 113, 133, 0.1)', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--danger)', marginBottom: '1.5rem' }}>
                            <DownloadCloud size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Data Exportability</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Your data belongs to you. Export your entire transaction history to CSV format with a single click for Excel or tax auditing.</p>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" style={{ padding: '6rem 4rem', display: 'flex', gap: '4rem', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ width: '100%', height: '400px', borderRadius: '24px', background: 'linear-gradient(45deg, var(--bg-card), rgba(140,82,255,0.2))', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                        <WalletCards size={120} color="var(--primary)" opacity={0.5} />
                    </div>
                </div>
                <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Empowering Your Financial Freedom</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                        At ExpanseTracker, we believe that understanding your money shouldn't require an accounting degree. We built this application using cutting edge technologies—like the MERN stack—to deliver a lightning fast, uncompromised, and incredibly beautiful experience.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%' }} />
                            <span>Built with React 18 & Vite for speed</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '8px', height: '8px', background: 'var(--success)', borderRadius: '50%' }} />
                            <span>Powered by Node.js & MongoDB</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '8px', height: '8px', background: 'var(--danger)', borderRadius: '50%' }} />
                            <span>Completely Ad-Free and Open Source</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ background: 'var(--bg-card)', padding: '3rem 4rem', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-primary)' }}>
                        <WalletCards size={24} color="var(--primary)" />
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>ExpanseTracker</h3>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <a href="#" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}><Code /></a>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <p>&copy; {new Date().getFullYear()} ExpanseTracker. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Privacy Policy</a>
                        <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Terms of Service</a>
                    </div>
                </div>
            </footer>

            {/* Embedded styles for nav-links specific to landing page */}
            <style jsx="true">{`
                .nav-link:hover {
                    color: var(--primary) !important;
                }
            `}</style>
        </div>
    );
};

export default Landing;
