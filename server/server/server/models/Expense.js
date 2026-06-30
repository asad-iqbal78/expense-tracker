const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        title: String,
        amount: Number,
        type: {
            type: String,
            enum: ['income', 'expense'],
        },
        category: String,
        date: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Expense', expenseSchema);