const mongoose = require('mongoose')
const Schema = mongoose.Schema

const propertySchema = new Schema({
    owner: { type: String, trim: true },
    askingPrice: { type: Number, required: true, default: 0 },
    successFee: { type:Number, required: true, default: 0 },
    noOfToken: { type: Number, default: 0 },
    pricePerToken: { type: Number, default: 0 },
    ownerSubscription: { type: Number, default: 0 },
    street: { type: String, trim: true },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipCode: { type: String },
    description: { type: String },
    propertyType: { type: String },
    builtSize: { type: Number, default: 0 },
    landSize: { type: Number, default: 0 },
    yearBuilt: { type: Number, default: 0 },
    occupancy: { type: Number, default: 0 },
    annualGrossRent: { type: Number, default: 0 },
    annualExpense: { type: Number, default: 0 },
    noi: { type: Number, default: 0 },
    expectedYield: { type: Number, default: 0 },
    image: { type: String },
    tokenId: { type: Number, default: 0 },
    transactionHash: { type: String },
    invProspectHash: { type: String },
    valuationHash: { type: String },
    subscription: { type: Number, default: 0 },
    status: { type: Number, default: 0 }
}, {
    timestamps: true,
})

const Property = mongoose.model('properties', propertySchema)

module.exports = Property