const ExpenseSchema = require('../models/expenseModel');

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const income = ExpenseSchema({
        user: req.user.id,
        title,
        amount,
        category,
        description,
        date,
        type: 'income'
    });

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }
        await income.save();
        res.status(200).json({ message: 'Income added successfully', data: income });
    } catch (error) {
        res.status(500).json({ message: 'Server Error adding income' });
    }
};

exports.getIncomes = async (req, res) => {
    try {
        let query = { type: 'income' };
        if (req.user.role !== 'admin') {
            query.user = req.user.id;
        }
        const incomes = await ExpenseSchema.find(query).sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error getting incomes' });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        const income = await ExpenseSchema.findByIdAndDelete(id);
        if (!income) {
             return res.status(404).json({ message: 'Income not found' })
        }
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error deleting income' });
    }
};
