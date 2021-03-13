const express = require("express");
const router = express.Router();
const Property = require("../models/properties.model");

const app = express();
app.use(express.json());

router.route("/").get((req, res) => {
  Property.find()
    .then((properties) => res.json(properties))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {

  const newProperty = new Property({
    owner: req.body.owner,
    askingPrice: req.body.askingPrice,
    noOfToken: req.body.noOfToken,
    pricePerToken: req.body.pricePerToken,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    zipCode: req.body.zipCode,
    description: req.body.description,
    propertyType: req.body.propertyType,
    builtSize: req.body.builtSize,
    landSize: req.body.landSize,
    yearBuilt: req.body.yearBuilt,
    occupancy: req.body.occupancy,
    annualGrossRent: req.body.annualGrossRent,
    annualExpense: req.body.annualExpense,
    noi: req.body.noi,
    expectedYield: req.body.expectedYield,
    image: req.body.image,
    scId: req.body.scId,
    transactionHash: req.body.transactionHash,
    subscription: req.body.subscription,
    status: req.body.status,
  });
  newProperty.save()
    .then((property) => res.json("Property added! " + property))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Property.findById(req.params.id)
    .then((property) => res.json(property))
    .catch((err) => res.status(400).json("FindById Error: " + err));
});

router.route("/update/:id").put((req, res) => {
  console.log(`update  ${JSON.stringify(req.body)} ${req.params.id}`);
  Property.findOneAndUpdate(
    { _id: req.body.id }, 
    req.body ,
    { new: true })
    .then((property) => {
      console.log(`Property updated! ${JSON.stringify(property)}`)
      res.json(property)
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
