const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: { 
    type: String, 
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: { 
    type: String, 
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password must be at least 8 characters'],
  },
}, { timestamps: true });

// Instance method to check password
// userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

// Check if password was changed after token was issued
// userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
//   if (this.passwordChangedAt) {
//     const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
//     return JWTTimestamp < changedTimestamp;
//   }
//   return false;
// };

// Only hash password if it was modified
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
  
//   this.password = await bcrypt.hash(this.password, 12);
//   this.passwordChangedAt = Date.now() - 1000; // Small hack to ensure token is created after
//   next();
// });

// Filter out inactive users
// userSchema.pre(/^find/, function(next) {
//   this.find({ active: { $ne: false } });
//   next();
// });

module.exports = mongoose.model('User', userSchema);