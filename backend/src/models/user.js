const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        unique: true,
        validate: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'Incorrect format'],
        required: true
    },
    password: { type: String, required: true },
    birthday: {
        type: Date,
        max: Date.now,
        required: true
    },
    gender: { type: String, enum: ['female', 'male', 'other'], required: true },
    token: { type: String }
});

module.exports = mongoose.model('users', userSchema);
