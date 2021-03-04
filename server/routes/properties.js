const router = require('express').Router()
let Property = require('../models/property.model')

router.route('/').get((req,res) => {
    Property.find()
    .then(properties => res.json(properties))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req,res) => {
    const owner = req.body.owner
    const askingprice = Number(req.body.askingprice)
    const street = req.body.street
    const city = req.body.city
    const state = req.body.state
    const country = req.body.country
    const zipcode = req.body.zipcode
    const description = req.body.description
    const propertytype = req.body.propertytype
    const builtsize = Number(req.body.builtsize)
    const landsize = Number(req.body.landsize)
    const yearbuilt = req.body.yearbuilt
    const occupancy = Number(req.body.occupancy)
    const annualgrossrent = Number(req.body.annualgrossrent)
    const annualexpenses = Number(req.body.annualexpenses)
    const noi = Number(req.body.noi)
    const expectedyield = Number(req.body.expectedyield)

    const newProperty = new Property({
        owner,
        askingprice,
        street,
        city,
        state,
        country,
        zipcode,
        description,
        propertytype,
        builtsize,
        landsize,
        yearbuilt,
        occupancy,
        annualgrossrent,
        annualexpenses,
        noi,
        expectedyield,
    })
    newProperty.save()
    .then(() => res.json('Property added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req,res) => {
    Property.findById(req.params.id)
    .then(property => res.json(property))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req,res) => {
    Property.findById(req.params.id)
    .then(property => {
        property.owner = req.body.owner
        property.askingprice = Number(req.body.askingprice)
        property.street = req.body.street
        property.city = req.body.city
        property.state = req.body.state
        property.country = req.body.country
        property.zipcode = req.body.zipcode
        property.description = req.body.description
        property.propertytype = req.body.propertytype
        property.builtsize = Number(req.body.builtsize)
        property.landsize = Number(req.body.landsize)
        property.yearbuilt = req.body.yearbuilt
        property.occupancy = Number(req.body.occupancy)
        property.annualgrossrent = Number(req.body.annualgrossrent)
        property.annualexpenses = Number(req.body.annualexpenses)
        property.noi = Number(req.body.noi)
        property.expectedyield = Number(req.body.expectedyield)
    
        property.save()
        .then(() => res.json('Property updated!'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router