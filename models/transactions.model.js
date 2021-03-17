const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    investor: { type: String, trim: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref:'properties' },
    noOfToken: { type: Number, default: 0 },
    transactionHash: { type: String },
    transactionDate: { type: Date }
}, {
    timestamps: true,
})

const Transaction = mongoose.model('transactions', transactionSchema)

module.exports = Transaction