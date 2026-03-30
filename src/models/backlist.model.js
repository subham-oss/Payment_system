import mongoose from "mongoose";

const backlistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "Token is required"],
    unique: [true, "Token must be unique"],
    index: true,
  },
  backlistAt:{
    type: Date,
    default: Date.now,
    immutable: true,
  }
},{
    timestamps: true,
});

backlistSchema.index({ creatAt: 1 },{
    expireAfterSeconds: 60 * 60 * 24 * 3, // 3 days
});
const Backlist = mongoose.model("Backlist", backlistSchema);

export default Backlist;