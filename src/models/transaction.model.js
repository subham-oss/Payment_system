import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    fromAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: [true, "Transaction must have a from account"],
      index: true,
    },
    toAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: [true, "Transaction must have a to account"],
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["PENDING", "COMPLETED", "FAILED", "REVISED"],
        message: "Status must be pending, completed, failed or revised",
      },
      default: "PENDING",
    },
    amount: {
      type: Number,
      required: [true, "Transaction must have an amount"],
      min: [0, "Amount must be greater than 0"],
    },
    idempotencyKey: {
      type: String,
      required: [true, "Transaction must have an idempotency key"],
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
