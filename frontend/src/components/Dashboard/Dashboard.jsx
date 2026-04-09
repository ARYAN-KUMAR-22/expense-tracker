import React from 'react';
import { useGlobalContext } from '../../context/globalContext';
import Chart from './Chart';
import axios from 'axios';
import { Download } from 'lucide-react';

const Dashboard = () => {
    const { totalIncome, totalExpense, totalBalance, transactionHistory, user } = useGlobalContext();

    const history = transactionHistory();

    const amountStyle = { fontSize: '2rem', fontWeight: 'bold' };

    const handleExport = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/v1/export-csv', { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'transactions.csv');
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            console.error('Error exporting data', err);
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    <div className="card" style={{ borderTop: '4px solid var(--success)' }}>
                        <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Income</h3>
                        <p style={{ ...amountStyle, color: 'var(--success)' }}>${totalIncome()}</p>
                    </div>
                    <div className="card" style={{ borderTop: '4px solid var(--danger)' }}>
                        <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Expense</h3>
                        <p style={{ ...amountStyle, color: 'var(--danger)' }}>${totalExpense()}</p>
                    </div>
                    <div className="card" style={{ borderTop: '4px solid var(--primary)' }}>
                        <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Balance</h3>
                        <p style={{ ...amountStyle, color: 'var(--text-primary)' }}>${totalBalance()}</p>
                    </div>
                </div>
                
                {/* Chart Area */}
                <div>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                         <h2>Analytics Overview</h2>
                         <button className="btn" onClick={handleExport} style={{ background: 'var(--success)', padding: '0.5rem 1rem' }}>
                             <Download size={18} /> Export CSV
                         </button>
                     </div>
                     <Chart />
                </div>
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h2>Recent Transactions</h2>
                {history.length > 0 ? (
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                         {history.map((item) => (
                             <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-dark)', borderRadius: '8px' }}>
                                 <div>
                                     <p style={{ fontWeight: 'bold' }}>{item.title}</p>
                                     <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                         {new Date(item.date).toLocaleDateString()}
                                     </p>
                                 </div>
                                 <p style={{ fontWeight: 'bold', color: item.type === 'expense' ? 'var(--danger)' : 'var(--success)' }}>
                                     {item.type === 'expense' ? '-' : '+'}${item.amount}
                                 </p>
                             </div>
                         ))}
                     </div>
                ) : (
                    <p style={{ color: 'var(--text-secondary)' }}>No transactions available.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
