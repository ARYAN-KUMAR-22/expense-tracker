import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import Chart from './Chart';
import axios from 'axios';
import { Download, AlertTriangle, Search } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const { totalIncome, totalExpense, totalBalance, transactionHistory, incomes, expenses, user, budgets, getBudgets } = useGlobalContext();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getBudgets();
    }, []);

    const history = transactionHistory();
    const amountStyle = { fontSize: '2rem', fontWeight: 'bold' };

    const getMinMax = (arr) => {
        if (arr.length === 0) return { min: 0, max: 0 };
        const amounts = arr.map(item => item.amount);
        return { min: Math.min(...amounts), max: Math.max(...amounts) };
    };

    const incomeStats = getMinMax(incomes);
    const expenseStats = getMinMax(expenses);
    const health = totalBalance() >= 0 ? { status: 'Healthy', color: 'var(--success)' } : { status: 'Overspending', color: 'var(--danger)' };

    // Group expenses by category
    const expensesByCategory = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
    }, {});

    // Check Budget Alerts
    const budgetAlerts = budgets.map(budget => {
        const spent = expensesByCategory[budget.category] || 0;
        if (spent > budget.amount) {
            return `Budget Exceeded for ${budget.category}! (Limit: $${budget.amount}, Spent: $${spent})`;
        }
        return null;
    }).filter(Boolean);

    // Filter History
    const filteredHistory = history.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExport = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/v1/export-csv', { responseType: 'blob', headers: { Authorization: `Bearer ${user.token}` } });
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'transactions.csv');
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            console.error(err);
        }
    };

    const pieData = {
        labels: Object.keys(expensesByCategory),
        datasets: [
            {
                data: Object.values(expensesByCategory),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                ],
                hoverBackgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                ]
            }
        ]
    };

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem' }}>Dashboard Overview</h1>
                <button onClick={handleExport} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--success)', padding: '0.8rem 1.5rem', fontSize: '1rem' }}>
                    <Download size={20} /> Export CSV
                </button>
            </div>

            {/* Budget Alerts */}
            {budgetAlerts.map((alert, idx) => (
                <div key={idx} style={{ background: 'rgba(251, 113, 133, 0.1)', border: '1px solid var(--danger)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--danger)' }}>
                    <AlertTriangle size={24} /> <strong>{alert}</strong>
                </div>
            ))}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card" style={{ borderTop: '4px solid var(--success)' }}>
                    <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Income</h3>
                    <p style={{ ...amountStyle, color: 'var(--success)' }}>${totalIncome()}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            <span>Min: ${incomeStats.min}</span>
                            <span>Max: ${incomeStats.max}</span>
                    </div>
                </div>
                <div className="card" style={{ borderTop: '4px solid var(--danger)' }}>
                    <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Expense</h3>
                    <p style={{ ...amountStyle, color: 'var(--danger)' }}>${totalExpense()}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            <span>Min: ${expenseStats.min}</span>
                            <span>Max: ${expenseStats.max}</span>
                    </div>
                </div>
                <div className="card" style={{ borderTop: '4px solid var(--primary)', position: 'relative' }}>
                    <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Balance</h3>
                    <p style={{ ...amountStyle, color: 'var(--text-primary)' }}>${totalBalance()}</p>
                    <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: health.color, color: 'white', padding: '0.3rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        {health.status}
                    </div>
                </div>
            </div>
            
            {/* Chart Area */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div className="card" style={{ flex: 2, minWidth: '400px' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Income/Expense Analytics</h3>
                    <Chart />
                </div>
                <div className="card" style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3 style={{ marginBottom: '1rem', width: '100%', textAlign: 'left' }}>Expenses by Category</h3>
                    {Object.keys(expensesByCategory).length > 0 ? (
                        <div style={{ width: '80%', margin: 'auto' }}><Pie data={pieData} /></div>
                    ) : (
                        <p style={{ color: 'var(--text-secondary)', marginTop: '2rem' }}>No expenses to chart.</p>
                    )}
                </div>
            </div>

            {/* Recent Transactions List with Search Filter */}
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.5rem' }}>Transaction History</h3>
                    <div style={{ position: 'relative', width: '300px' }}>
                        <Search size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-secondary)' }} />
                        <input 
                           type="text" 
                           placeholder="Filter by title or category..." 
                           value={searchTerm} 
                           onChange={(e) => setSearchTerm(e.target.value)} 
                           className="input-control" 
                           style={{ padding: '0.6rem 1rem 0.6rem 2.5rem', margin: 0, width: '100%' }} 
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {filteredHistory.map((item) => (
                        <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'var(--bg-dark)', borderRadius: '12px', border: '1px solid var(--border-color)', borderLeft: `4px solid ${item.type === 'expense' ? 'var(--danger)' : 'var(--success)'}` }}>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{item.title}</h4>
                                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    <span>{new Date(item.date).toLocaleDateString()}</span>
                                    <span>•</span>
                                    <span style={{ textTransform: 'capitalize' }}>{item.category}</span>
                                </div>
                            </div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: item.type === 'expense' ? 'var(--danger)' : 'var(--success)' }}>
                                {item.type === 'expense' ? '-' : '+'}${item.amount}
                            </div>
                        </div>
                    ))}
                    {filteredHistory.length === 0 && (
                        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>No transactions match your search.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
