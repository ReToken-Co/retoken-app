const mongoose = require('mongoose')
const Schema = mongoose.Schema
const propertySchema = new Schema({
    owner: { type: String, required: true, trim: true },
    askingprice: { type: Number, required: true },
    street: { type: String, required: true, trim: true },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipcode: { type: String },
    description: { type: String },
    propertytype: { type: String },
    builtsize: { type: Number },
    landsize: { type: Number },
    yearbuilt: { type: Number },
    occupancy: { type: Number },
    annualgrossrent: { type: Number },
    annualexpenses: { type: Number },
    noi: { type: Number },
    expectedyield: { type: Number }
}, {
    timestamps: true,
})

const Property = mongoose.model('retoken', propertySchema)

module.exports = Property