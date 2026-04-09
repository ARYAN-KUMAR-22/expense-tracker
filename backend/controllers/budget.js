const Budget = require('../models/budgetModel');

exports.addBudget = async (req, res) => {
    const { category, amount } = req.body;

    try {
        if(!category || !category.trim()) {
            return res.status(400).json({message: 'Category is required!'});
        }
        if(!amount || amount <= 0 || isNaN(amount)) {
            return res.status(400).json({message: 'Amount must be a positive number!'});
        }

        // Check if a budget for this category already exists for the user
        let budget = await Budget.findOne({ category: category.trim(), user: req.user.id });

        if (budget) {
            budget.amount = amount;
            await budget.save();
            return res.status(200).json({ message: 'Budget Updated', budget });
        } else {
            budget = new Budget({
                category: category.trim(),
                amount,
                user: req.user.id
            });
            await budget.save();
            return res.status(200).json({ message: 'Budget Created', budget });
        }
    } catch (error) {
        console.error("Budget Error:", error);
        res.status(500).json({message: 'Server Error'});
    }
};

exports.getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({ user: req.user.id }).sort({createdAt: -1});
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
};

exports.deleteBudget = async (req, res) => {
    const { id } = req.params;
    try {
        const budget = await Budget.findOne({ _id: id, user: req.user.id });
        if (!budget) {
            return res.status(404).json({message: 'Budget not found or unauthorized'});
        }
        await Budget.findByIdAndDelete(id);
        res.status(200).json({message: 'Budget Deleted'});
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
};
