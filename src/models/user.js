const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  referralCode: { type: String },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  technology: { type: [String], required: true },
  profilePic: { type: [String] },
  dateOfBirth: { type: Date },
  points: { type: Number, default: 0 },
  referralUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
