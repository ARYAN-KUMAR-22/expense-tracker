const router = require('express').Router();
const { addExpense, getExpenses, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const { protect, authorize } = require('../middleware/auth');

const { exportCSV } = require('../controllers/dataExport');

router.get('/export-csv', protect, exportCSV)
    .post('/add-income', protect, addIncome)
    .get('/get-incomes', protect, getIncomes)
    .delete('/delete-income/:id', protect, deleteIncome)
    .post('/add-expense', protect, addExpense)
    .get('/get-expenses', protect, getExpenses)
    .delete('/delete-expense/:id', protect, deleteExpense);

module.exports = router;
