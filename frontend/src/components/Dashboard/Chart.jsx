import React from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Chart = () => {
    const { incomes, expenses } = useGlobalContext();

    const data = {
        labels: incomes.map((inc) => {
            const { date } = inc;
            return new Date(date).toLocaleDateString();
        }),
        datasets: [
            {
                label: 'Income',
                data: incomes.map((income) => income.amount),
                backgroundColor: 'rgba(45, 212, 191, 0.2)', // var(--success)
                borderColor: '#2dd4bf',
                tension: 0.2,
                fill: true
            },
            {
                label: 'Expense',
                data: expenses.map((expense) => expense.amount),
                backgroundColor: 'rgba(251, 113, 133, 0.2)', // var(--danger)
                borderColor: '#fb7185',
                tension: 0.2,
                fill: true
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#ffffff'
                }
            },
        },
        scales: {
            x: {
                ticks: { color: '#94a3b8' },
                grid: { color: '#272a3d' }
            },
            y: {
                ticks: { color: '#94a3b8' },
                grid: { color: '#272a3d' }
            }
        }
    };

    return (
        <div className="card chart-container" style={{ height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             {incomes.length > 0 || expenses.length > 0 ? (
                 <Line data={data} options={options} />
             ) : (
                 <p style={{ color: '#94a3b8' }}>No data to display in chart yet.</p>
             )}
        </div>
    );
};

export default Chart;
