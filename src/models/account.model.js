import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
        index: true
    },
    status:{
        type: String,
        enum:{
            values: ["ACTIVE","FROZEN", "CLOSED"],
            message: "Status must be active, frozen or closed",
        },
        default: "ACTIVE"
    },
    currency:{
        type: String,
        required: [true, "Currency is required"],
        default: "INR"
    }
},{
    timestamps: true
})

accountSchema.index({ user: 1 , status:1 });

const Account = mongoose.model("Account", accountSchema);

export default Account;