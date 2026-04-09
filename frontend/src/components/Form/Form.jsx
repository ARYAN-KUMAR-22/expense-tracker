import React, { useState } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { Trash2 } from 'lucide-react';

const Form = ({ type }) => {
    const { addIncome, addExpense, incomes, expenses, deleteIncome, deleteExpense } = useGlobalContext();

    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    });

    const isExpense = type === 'expense';
    const dataList = isExpense ? expenses : incomes;

    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
    };

    const handleSubmit = e => {
        e.preventDefault()
        if (isExpense) {
            addExpense(inputState);
        } else {
            addIncome(inputState);
        }
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        })
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
            {/* Form Section */}
            <div className="card">
                <h2 style={{ marginBottom: '1.5rem', textTransform: 'capitalize' }}>Add {type}</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="input-control">
                        <input type="text" value={title} name={'title'} placeholder="Title" onChange={handleInput('title')} required />
                    </div>
                    <div className="input-control">
                        <input type="number" value={amount} name={'amount'} placeholder="Amount" onChange={handleInput('amount')} required />
                    </div>
                    <div className="input-control">
                        <input type="date" value={date} name={'date'} onChange={handleInput('date')} required style={{ colorScheme: 'dark' }} />
                    </div>
                    <div className="input-control">
                        <select required value={category} name="category" onChange={handleInput('category')}>
                            <option value="" disabled >Select Category</option>
                            <option value="salary">Salary</option>
                            <option value="freelance">Freelance</option>
                            <option value="investments">Investments</option>
                            <option value="stocks">Stocks</option>
                            <option value="bitcoin">Bitcoin</option>
                            <option value="bank">Bank</option>
                            <option value="other">Other</option>
                            {isExpense && (
                              <>
                                <option value="education">Education</option>
                                <option value="groceries">Groceries</option>
                                <option value="health">Health</option>
                                <option value="subscriptions">Subscriptions</option>
                                <option value="takeaways">Takeaways</option>
                                <option value="clothing">Clothing</option>  
                                <option value="traveling">Traveling</option>  
                              </>
                            )}
                        </select>
                    </div>
                    <div className="input-control">
                        <textarea name="description" value={description} placeholder="Description" id="description" cols="30" rows="3" onChange={handleInput('description')} required></textarea>
                    </div>
                    <button type="submit" className="btn" style={{ marginTop: '1rem' }}>
                        Add {type}
                    </button>
                </form>
            </div>

            {/* List Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h2 style={{ textTransform: 'capitalize' }}>{type} History</h2>
                {dataList.length > 0 ? dataList.map((item) => (
                    <div key={item._id} className="card animate-fade" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem' }}>
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ textTransform: 'capitalize' }}>{item.title}</h3>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{new Date(item.date).toLocaleDateString()} • {item.category}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: isExpense ? 'var(--danger)' : 'var(--success)' }}>
                                {isExpense ? '-' : '+'}${item.amount}
                            </p>
                            <button 
                                onClick={() => isExpense ? deleteExpense(item._id) : deleteIncome(item._id)}
                                style={{ background: 'rgba(255,0,0,0.1)', color: 'var(--danger)', padding: '0.5rem', borderRadius: '50%' }}>
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                )) : (
                    <p style={{ color: 'var(--text-secondary)' }}>No {type}s logged yet.</p>
                )}
            </div>
        </div>
    );
};

export default Form;
