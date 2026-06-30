const Expense = require('../models/Expense');

const getDashboard = async (req, res) => {
    try {
        const userId = req.user.id;

        const summary = await Expense.aggregate([
            {
                $match: { userId }
            },
            {
                $group: {
                    _id: '$type',
                    totalAmount: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            }
        ]);

        let totalIncome = 0;
        let totalExpense = 0;
        let totalTransactions = 0;

        summary.forEach(item => {
            if (item._id === 'income') {
                totalIncome = item.totalAmount;
            } else if (item._id === 'expense') {
                totalExpense = item.totalAmount;
            }
            totalTransactions += item.count;
        });

        const balance = totalIncome - totalExpense;

        const recentTransactions = await Expense.find({ userId })
            .sort({ date: -1 })
            .limit(5);

        const monthlyStats = await Expense.aggregate([
            {
                $match: { userId }
            },
            {
                $group: {
                    _id: {
                        month: { $month: '$date' },
                        year: { $year: '$date' },
                        type: '$type',
                    },
                    totalAmount: { $sum: '$amount' },
                },
            },
            {
                $sort: {
                    '_id.year': 1,
                    '_id.month': 1,
                },
            },
        ]);

        const categoryStats = await Expense.aggregate([
            {
                $match: {
                    userId,
                    type: 'expense',
                },
            },
            {
                $group: {
                    _id: '$category',
                    total: {
                        $sum: '$amount',
                    },
                },
            },
            {
                $sort: {
                    total: -1,
                },
            },
        ]);

        res.status(200).json({
            success: true,
            summary: {
                totalIncome,
                totalExpense,
                balance,
                totalTransactions,
            },
            recentTransactions,
            monthlyStats,
            categoryStats,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getDashboard
};