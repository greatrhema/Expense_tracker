const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accountSettings: {
        currency: { type: String, default: 'NGN' },
        budgetLimit: { type: Number, default: 0 }
    }
});

// Hash the password before saving the user
// userSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

const user = mongoose.model('user', userSchema);

module.exports = user;