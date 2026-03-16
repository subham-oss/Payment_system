import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: [true, "Ledger must have an account"],
    index: true,
    immutable: true,
  },
  amount: {
    type: Number,
    required: [true, "Ledger must have an amount"],
    immutable: true,
  },
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
    required: [true, "Ledger must have a transaction"],
    index: true,
    immutable: true,
  },
  type: {
    type: String,
    required: [true, "Ledger must have a type"],
    enum: {
      values: ["credit", "debit"],
      message: "Type must be credit or debit",
    },
    immutable: true,
  },
});


const preventmodelupdate = ()=>{
    throw new Error("Ledger entries cannot be updated");
}

ledgerSchema.pre("findOneAndUpdate", preventmodelupdate);
ledgerSchema.pre("updateOne", preventmodelupdate);
ledgerSchema.pre("updateMany", preventmodelupdate);
ledgerSchema.pre("replaceOne", preventmodelupdate);
ledgerSchema.pre("update", preventmodelupdate);
ledgerSchema.pre("deleteMany", preventmodelupdate);
ledgerSchema.pre("deleteOne", preventmodelupdate);
ledgerSchema.pre("findOneAndDelete", preventmodelupdate);
ledgerSchema.pre("findOneAndRemove", preventmodelupdate);
ledgerSchema.pre("remove", preventmodelupdate);

const Ledger = mongoose.model("Ledger", ledgerSchema);

export default Ledger;