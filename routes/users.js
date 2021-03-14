const express = require("express");
const router = express.Router();
const User = require("../models/users.model");

const app = express();
app.use(express.json());

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/findByAddress").get((req, res) => {
  User.findOne( req.query )
    .then((user) => {
      console.log (`finduser result ${JSON.stringify(user)} ${JSON.stringify(req.body)}`)
      res.json(user)
    })
    .catch((err) => res.status(400).json("FindUserByAddress Error: " + err));
});

router.route("/add").post((req, res) => {

  const newUser = new User({
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    role: req.body.role
  });
  newUser.save()
    .then((user) => res.json("User added! " + user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("FindById Error: " + err));
});

router.route("/update/:id").put((req, res) => {
  console.log(`update  ${JSON.stringify(req.body)} ${req.params.id}`);
  User.findOneAndUpdate(
    { _id: req.body.id }, 
    req.body ,
    { new: true })
    .then((user) => {
      console.log(`User updated! ${JSON.stringify(user)}`)
      res.json(user)
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
