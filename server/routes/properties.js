const router = require("express").Router();
const bodyParser = require("body-parser")
const Property = require("../models/property.model");

const jsonParser = bodyParser.json()
const rawParser = bodyParser.raw()

router.get("/getproperty", (req, res) => {
  Property.find()
    .then((properties) => res.json(properties))
    .catch((err) => res.status(400).json("Error: " + err));
});

//router.route('/addproperty').post((req,res) => {
router.post("/addproperty", jsonParser, (req, res) => {
//  req.rawBody = buf;
  const newProperty = new Property({
    owner: req.body.owner,
    askingPrice: req.body.askingPrice,
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
  });
  newProperty
    .save()
    .then((property) => res.json("Property added! " + property))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/property/:id").get((req, res) => {
  Property.findById(req.params.id)
    .then((property) => res.json(property))
    .catch((err) => res.status(400).json("FindById Error: " + err));
});

router.route("/updateproperty/:id").post((req, res) => {
  Property.findById(req.params.id)
    .then((property) => {
      property.owner = req.body.owner;
      property.askingprice = Number(req.body.askingprice);
      property.street = req.body.street;
      property.city = req.body.city;
      property.state = req.body.state;
      property.country = req.body.country;
      property.zipcode = req.body.zipcode;
      property.description = req.body.description;
      property.propertytype = req.body.propertytype;
      property.builtsize = Number(req.body.builtsize);
      property.landsize = Number(req.body.landsize);
      property.yearbuilt = req.body.yearbuilt;
      property.occupancy = Number(req.body.occupancy);
      property.annualgrossrent = Number(req.body.annualgrossrent);
      property.annualexpenses = Number(req.body.annualexpenses);
      property.noi = Number(req.body.noi);
      property.expectedyield = Number(req.body.expectedyield);

      property
        .save()
        .then((property) => res.json("Property updated! " + property))
        .catch((err) => res.status(400).json("Update Error: " + err));
    })
    .catch((err) => res.status(400).json("FindById Error: " + err));
});

module.exports = router;
