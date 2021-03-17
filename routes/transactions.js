const express = require("express");
const router = express.Router();
const Transaction = require("../models/transactions.model");

const app = express();
app.use(express.json());

router.route("/").get((req, res) => {
  Transaction.find()
    .then((transactions) => res.json(transactions))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {

  const newTransaction = new Transaction({
    investor: req.body.investor,
    propertyId: req.body.propertyId,
    noOfToken: req.body.noOfToken,
    transactionHash: req.body.transactionHash,
    transactionDate: req.body.transactionDate
  });
  newTransaction.save()
    .then((transaction) => res.json("Transaction added! " + transaction))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/findTxByUser").get((req, res) => {
  Transaction.find( req.query )
    .then((transactions) => res.json(transactions))
    .catch((err) => res.status(400).json("FindTxByUser Error: " + err));
});

router.route("/findTxByAsset").get((req, res) => {
  Transaction.find( req.query )
    .then((transactions) => res.json(transactions))
    .catch((err) => res.status(400).json("findTxByAsset Error: " + err));
});

router.route("/:id").get((req, res) => {
  Transaction.findById(req.params.id)
    .then((Transaction) => res.json(Transaction))
    .catch((err) => res.status(400).json("FindById Error: " + err));
});

router.route("/update/:id").put((req, res) => {
  console.log(`update  ${JSON.stringify(req.body)} ${req.params.id}`);
  Transaction.findOneAndUpdate(
    { _id: req.body.id }, 
    req.body ,
    { new: true })
    .then((transaction) => {
      console.log(`Transaction updated! ${JSON.stringify(transaction)}`)
      res.json(transaction)
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
