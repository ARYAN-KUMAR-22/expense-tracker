const ExpenseSchema = require('../models/expenseModel');
const { Parser } = require('json2csv');

exports.exportCSV = async (req, res) => {
    try {
        let query = {};
        if (req.user.role !== 'admin') {
            query.user = req.user.id;
        }
        
        const transactions = await ExpenseSchema.find(query).lean();
        
        if (!transactions || transactions.length === 0) {
             return res.status(404).json({ message: 'No transactions found to export.' });
        }

        const fields = ['title', 'amount', 'type', 'category', 'date', 'description', 'createdAt'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(transactions);

        res.header('Content-Type', 'text/csv');
        res.attachment('transactions.csv');
        return res.send(csv);

    } catch (error) {
        res.status(500).json({ message: 'Could not export CSV' });
    }
};
