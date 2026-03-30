import mongoose from "mongoose";
import Transaction from "../models/transaction.model.js";
import Ledger from "../models/ledger.model.js";
import Account from "../models/account.model.js";
import {
  sendTransactionEmail,
  sendFailureEmail,
} from "../services/email.service.js";

export const createTransaction = async (req, res) => {
  const { fromAccount, toAccount, amount, idempotencyKey } = req.body;

  if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
    return res.status(400).json({
      message:
        "From account, to account, amount and idempotency key are required",
    });
  }

  const fromUserAccount = await Account.findOne({ _id: fromAccount });
  const toUserAccount = await Account.findOne({ _id: toAccount });

  if (!fromUserAccount || !toUserAccount) {
    return res.status(404).json({ message: "Account not found" });
  }

  const isTransactionExist = await Transaction.findOne({
    idempotencyKey: idempotencyKey,
  });

  if (isTransactionExist) {
    if (isTransactionExist.status === "COMPLETED") {
      return res.status(200).json({
        message: "Transaction already completed",
        transaction: isTransactionExist,
      });
    }
    if (isTransactionExist.status === "PENDING") {
      return res.status(200).json({
        message: "Transaction already pending",
      });
    }
    if (isTransactionExist.status === "FAILED") {
      return res.status(500).json({
        message: "Transaction already failed",
      });
    }
    if (isTransactionExist.status === "REVISED") {
      return res.status(500).json({
        message: "Transaction already revised",
      });
    }
  }

  if (
    fromUserAccount.status !== "ACTIVE" ||
    toUserAccount.status !== "ACTIVE"
  ) {
    return res.status(400).json({
      message: "Both accounts must be active to perform transaction",
    });
  }
  const balance = await fromUserAccount.getBalance();
  if (balance < amount) {
    return res.status(400).json({
      message: `Insufficient balance in from account to perform transaction. Current balance is ${balance}. Please reduce the amount or add funds to the account and try again.`,
    });
  }

 try {
   const session = await mongoose.startSession();
   session.startTransaction();
 
   const transaction = new Transaction(
     {
       fromAccount,
       toAccount,
       amount,
       idempotencyKey,
       status: "PENDING",
     },
   );
 
   const debitLedgerEntry = await Ledger.create([
     {
       account: fromAccount,
       type: "debit",
       amount,
       transaction: transaction._id,
     }],
     { session },
   );
 
   const creditLedgerEntry = await Ledger.create([
     {
       account: toAccount,
       type: "credit",
       amount,
       transaction: transaction._id,
     }],
     { session },
   );
   transaction.status = "COMPLETED";
   await transaction.save({ session });
   await session.commitTransaction();
   session.endSession();
 
   await sendTransactionEmail(
     req.user.name,
     req.user.email,
     amount,
     toUserAccount._id,
   );
   res.status(201).json({
     message: "Transaction completed successfully",
     transaction,
   });
 } catch (error) {
   await session.abortTransaction();
   session.endSession();
   return res.status(500).json({
     message: "An error occurred while processing the transaction",
   });
 }
};

export const createInitialFunds = async (req, res) => {
  const { toAccount, amount, idempotencyKey } = req.body;
  if (!toAccount || !amount || !idempotencyKey) {
    return res.status(400).json({
      message: "To account, amount and idempotency key are required",
    });
  }
  const toUserAccount = await Account.findOne({ _id: toAccount });
  if (!toUserAccount) {
    return res.status(404).json({ message: "Account not found" });
  }

  const fromUserAccount = await Account.findOne({ user: req.user._id });
  if (!fromUserAccount) {
    return res.status(404).json({ message: "System account not found" });
  }
  const session = await mongoose.startSession();
  session.startTransaction();

  const transaction = new Transaction({
    fromAccount: fromUserAccount._id,
    toAccount,
    amount,
    idempotencyKey,
    status: "PENDING",
  })
  const debitLedgerEntry = await Ledger.create([
    {
      account: fromUserAccount._id,
      type: "debit",
      amount:amount,
      transaction: transaction._id,
    }],
    { session },
  )

  const creditLedgerEntry = await Ledger.create([
    {
      account: toAccount,
      type: "credit",
      amount:amount,
      transaction: transaction._id,
    }],
    { session },
  );
  transaction.status = "COMPLETED";
  await transaction.save({ session });
  await session.commitTransaction();
  session.endSession();

  res.status(201).json({
    message: "Initial funds added successfully",
    transaction,
  });
};
