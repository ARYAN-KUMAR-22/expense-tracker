import React, { useState, useEffect } from 'react';
import { Home, LineChart, WalletCards, ArrowRightLeft, LogOut } from 'lucide-react';
import Dashboard from '../components/Dashboard/Dashboard';
import Form from '../components/Form/Form';
import { useGlobalContext } from '../context/globalContext';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');
  const { getIncomes, getExpenses, user, setUser } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  const displayComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Incomes':
        return <Form type="income" />;
      case 'Expenses':
        return <Form type="expense" />;
      default:
        return <Dashboard />;
    }
  };

  const handleLogout = () => {
      setUser(null);
      navigate('/');
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <nav style={{ width: '250px', background: 'var(--bg-card)', padding: '2rem 1rem', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--primary)' }}>
          <WalletCards size={32} />
          <h2>Menu</h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Welcome, {user?.name}</p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          <li 
            onClick={() => setActiveComponent('Dashboard')}
            style={{ padding: '0.8rem 1rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '1rem', background: activeComponent === 'Dashboard' ? 'var(--primary)' : 'transparent', transition: '0.3s' }}>
            <Home /> Dashboard
          </li>
          <li 
            onClick={() => setActiveComponent('Incomes')}
            style={{ padding: '0.8rem 1rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '1rem', background: activeComponent === 'Incomes' ? 'var(--primary)' : 'transparent', transition: '0.3s' }}>
            <LineChart /> Incomes
          </li>
          <li 
            onClick={() => setActiveComponent('Expenses')}
            style={{ padding: '0.8rem 1rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '1rem', background: activeComponent === 'Expenses' ? 'var(--primary)' : 'transparent', transition: '0.3s' }}>
            <ArrowRightLeft /> Expenses
          </li>
        </ul>
        <button onClick={handleLogout} className="btn" style={{ background: 'var(--danger)' }}>
            <LogOut /> Logout
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="main-content animate-fade">
        <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <h1 style={{ fontSize: '2rem' }}>{activeComponent} {user?.role === 'admin' ? '(Admin Mode)' : ''}</h1>
        </header>
        {displayComponent()}
      </main>
    </div>
  );
};

export default DashboardLayout;
