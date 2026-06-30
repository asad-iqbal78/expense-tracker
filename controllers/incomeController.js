const Expense = require("../models/Expense");

const addIncome = async (req, res) => {
    try {
        const income = await Expense.create({
            userId: req.user.id, // Assuming user ID is stored in req.user after authentication
            title: req.body.title,
            amount: req.body.amount,
            type: "income", // Set type to "income"
            category: req.body.category,
            date: req.body.date
        });
        res.status(201).json(income);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getIncome = async (req, res) => {
    try {
        const income = await Expense.find({ userId: req.user.id, type: "income" });
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateIncome = async (req, res) => {
    try {
        const income = await Expense.findById(req.params.id);
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }
        const updatedIncome = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedIncome);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteIncome = async (req, res) => {
    try {
        const income = await Expense.findById(req.params.id);
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addIncome,
    getIncome,
    updateIncome,
    deleteIncome
};