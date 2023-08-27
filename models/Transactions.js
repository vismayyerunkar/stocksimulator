import mongoose from "mongoose";

// Defining Schema
const transaction = new mongoose.Schema({
  price: { type: Number, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  symbol: { type: String, required: true, trim: true },
  date:{type:Date,default:new Date().getDate()},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true } // Use ref to reference UserModel
});

// Model
const Transaction = mongoose.model("Transaction", transaction)
export default Transaction



