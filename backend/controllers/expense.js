const ExpenseSchema = require('../models/expenseModel');

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const expense = ExpenseSchema({
        user: req.user.id,
        title,
        amount,
        category,
        description,
        date,
        type: 'expense'
    });

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }
        await expense.save();
        res.status(200).json({ message: 'Expense added successfully', data: expense });
    } catch (error) {
        res.status(500).json({ message: 'Server Error adding expense' });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        let query = { type: 'expense' };
        if (req.user.role !== 'admin') {
            query.user = req.user.id;
        }
        const expenses = await ExpenseSchema.find(query).sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error getting expenses' });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await ExpenseSchema.findByIdAndDelete(id);
        if (!expense) {
             return res.status(404).json({ message: 'Expense not found' })
        }
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error deleting expense' });
    }
};
