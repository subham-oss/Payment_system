import mongoose from "mongoose";
import Transaction from "../models/transaction.model";
import Ledger from "../models/ledger.model";
import Account from "../models/account.model";
const createTransaction = async (req, res) => {
  const { fromAccount, toAccount, amount, idempotencyKey } = req.body;

  if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
    return res
      .status(400)
      .json({
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
      if(isTransactionExist.status === "COMPLETED"){
          return res.status(200).json({
              message: "Transaction already completed",
              transaction: isTransactionExist,
          });
      } 
      if(isTransactionExist.status === "PENDING"){
          return res.status(200).json({
              message: "Transaction already pending",
          });
      }
      if(isTransactionExist.status === "FAILED"){
          return res.status(500).json({
              message: "Transaction already failed",
          });
      }
      if(isTransactionExist.status === "REVISED"){
          return res.status(500).json({
              message: "Transaction already revised",
          });
      }
  }

  if(fromUserAccount.status !== "ACTIVE" || toUserAccount.status !== "ACTIVE"){
      return res.status(400).json({
          message: "Both accounts must be active to perform transaction",
      });
  }
};
