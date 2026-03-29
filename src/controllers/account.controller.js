import Account from "../models/account.model.js";

export const createAccountController = async (req, res) => {
  const user = req.user;

  const account = await Account.create({
    user: user._id,
  });

  res.status(201).json({
    message: "Account created successfully",
    account,
  });
};

export const getUserAccountsController = async (req, res) => {
  const user = req.user;

  const accounts = await Account.find({ user: user._id });

  res.status(200).json({
    message: "User accounts retrieved successfully",
    accounts,
  });
};

export const getAccountBalanceController = async (req, res) => {
  const { AccountId } = req.params;
  const account = await Account.findOne({ _id: AccountId, user: req.user._id });

  if (!account) {
    return res.status(404).json({
      message: "Account not found",
    });
  }

  const balance = await account.getBalance();

  res.status(200).json({
    message: "Account balance retrieved successfully",
    balance,
  });
}