const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    aadhaar: { type: String, required: true, unique: true },
    token: {
        type: String,
        default: null
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User; 