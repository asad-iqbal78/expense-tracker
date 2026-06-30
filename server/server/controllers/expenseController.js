const Expense = require('../models/Expense');

const addExpense = async (req, res) => {
    try{
        const expense = await Expense.create({
            userId: req.user.id, // Assuming user ID is stored in req.user after authentication
            title: req.body.title,
            amount: req.body.amount,
            type: req.body.type,
            category: req.body.category,
            date: req.body.date
        });
        res.status(201).json(expense);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

const getExpenses = async (req, res) => {
    try{
        const search = req.query.search || '';
        const filter = search ? { title: { $regex: search, $options: 'i' }, userId: req.user.id } : { userId: req.user.id };
        const expenses = await Expense.find(filter).sort({ createdAt: -1 });
        if(!expenses || expenses.length === 0) {
            return res.status(404).json({ message: 'No expenses found for this user' });
        }
        res.status(200).json(expenses);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

const updateExpense = async (req, res) => {
    try{
        const expense = await Expense.findById(req.params.id);
        if(!expense){
            return res.status(404).json({ message: 'Expense not found' });
        } 
        if(expense.userId.toString() !== req.user.id){
            return res.status(401).json({ message: 'Not authorized to update this expense' });
        }
        expense.title = req.body.title || expense.title;
        expense.amount = req.body.amount || expense.amount;
        expense.type = req.body.type || expense.type;
        expense.category = req.body.category || expense.category;
        expense.date = req.body.date || expense.date; 
        await expense.save(); 
        res.status(200).json(expense);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

const deleteExpense = async (req, res) => {
    try{
        const expense = await Expense.findById(req.params.id);
        if(!expense){
            return res.status(404).json({ message: 'Expense not found' });
        }
        if(expense.userId.toString() !== req.user.id){
            return res.status(401).json({ message: 'Not authorized to delete this expense' });
        }
        await expense.deleteOne();
        res.status(200).json({ message: 'Expense deleted successfully' });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense
};