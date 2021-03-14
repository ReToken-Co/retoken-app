const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, trim: true },
    address: { type: String, trim: true },
    email: { type: String, trim: true },
    role: { type: String },
    verified: { type: Boolean }
}, {
    timestamps: true,
})

const User = mongoose.model('users', userSchema)

module.exports = User