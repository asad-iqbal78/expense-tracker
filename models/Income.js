const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true,
    },
    category: {
        type: String,
        required: true, 
    },
    date: {
        type: Date,
        default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", incomeSchema);