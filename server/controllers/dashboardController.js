const Expense = require('../models/Expense');

const getDashboard = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id }).sort({ createdAt: -1 });
        let totalIncome = 0;
        let totalExpense = 0;

        expenses.forEach(expense => {
            if (expense.type === 'income') {
                totalIncome += expense.amount;
            } else if (expense.type === 'expense') {
                totalExpense += expense.amount;
            }   
        }); 

        const balance = totalIncome - totalExpense;

        res.status(200).json({
            totalIncome,
            totalExpense,
            balance,
            recentTransactions: expenses.slice(0, 5) // Return the 5 most recent transactions
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDashboard
};