const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  age: { type: Number },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  religion: { type: String },
  location: { type: String },
  maritalStatus: { type: String, enum: ['Never Married', 'Divorced', 'Widowed'], default: 'Never Married' },
  education: { type: String },
  university: { type: String },
  profession: { type: String },
  bio: { type: String, maxlength: 500 },
  photo: { type: String, default: '' },
  isAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// // Hash password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });
// Hash password before saving
userSchema.pre('save', async function () {   // ← Remove 'next' parameter
  // Only hash if password was modified (or is new)
  if (!this.isModified('password')) return;   // ← Just return, no next()

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  // No need to call next() — Mongoose handles it automatically for async functions
});

// Compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
