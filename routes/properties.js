const express = require("express");
const router = express.Router();
const multer = require("multer")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage})
const Property = require("../models/properties.model");

const app = express();
app.use(express.json());

router.route("/").get((req, res) => {
  Property.find()
    .then((properties) => res.json(properties))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {

  // upload image to cloudinary first
  // console.log(`imgfile ${JSON.stringify(req.file)}`)
  // console.log(`data ${JSON.stringify(req.data)}`)

  const newProperty = new Property({
    owner: req.body.owner,
    askingPrice: req.body.askingPrice,
    successFee: req.body.successFee,
    noOfToken: req.body.noOfToken,
    pricePerToken: req.body.pricePerToken,
    ownerSubscription: req.body.ownerSubscription,
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
    tokenId: req.body.tokenId,
    transactionHash: req.body.transactionHash,
    invProspectHash: req.body.invProspectHash,
    valuationHash: req.body.valuationHash,
    subscription: req.body.subscription,
    status: req.body.status,
  });
  newProperty.save()
    .then((property) => {
      console.log("Property added! " + property)
      res.json(property)
    })
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
