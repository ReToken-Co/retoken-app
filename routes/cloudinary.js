const express = require("express");
const router = express.Router();
const dotenv = require('dotenv')
const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

router.route("/upload").post(async (req, res) => {
  try {
    const fileObj = req.body.data;
    console.log(`filename ${file.name}`);
    const uploadResponse = await cloudinary.uploader.upload(
      fileObj, 
      {upload_present: 'retoken\images'})
      console.log(`cloud res ${uploadResponse}`);
      res.json({msg: "Image Uploaded Successfully"})
  } catch (err) {
    console.log("Error: " + err);
    res.status(500).json({err: "Something went wrong!!"})
  }
});

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/findByAddress").get((req, res) => {
  User.findOne(req.query)
    .then((user) => {
      console.log(
        `finduser result ${JSON.stringify(user)} ${JSON.stringify(req.body)}`
      );
      res.json(user);
    })
    .catch((err) => res.status(400).json("FindUserByAddress Error: " + err));
});

module.exports = router;
