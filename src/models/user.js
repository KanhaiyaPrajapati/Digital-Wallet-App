import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
    email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  transactions: [
    {
      id: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        enum: ["credit", "debit"],
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        required: true,
      },
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

