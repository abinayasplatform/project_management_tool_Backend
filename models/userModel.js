const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["admin", "team leader", "developer", "tester", "analyst"],
    default: "team leader",
  },
  phoneNumber: { type: String },
  description: { type: String },
  username: { type: String },
});

module.exports = mongoose.model("User", userSchema);
