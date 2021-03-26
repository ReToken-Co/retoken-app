const express = require("express");
const router = express.Router();
const cloudinary = require('cloudinary').v2
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
require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
//app.use(fileupload())

router.route("/images/").get(async (req, res) => {
  const { resources } = await cloudinary.search
      .expression('folder:retoken/images')
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});

router.route("/upload").post(async (req, res) => {
  // console.log(res.file)
  // console.log(res.body)
  // console.log(res.body.data.filename)
  try {
    const file = req.body.data;
    console.log(`file ${req.body.data}`);
    const uploadResponse = await cloudinary.uploader.upload(
      file, 
      {upload_present: 'retoken/images'})
      console.log(`cloud res ${uploadResponse}`);
      res.json({msg: "Image Uploaded Successfully"})
  } catch (err) {
    console.log("Error: " + JSON.stringify(err));
    res.status(500).json({err: "Something went wrong!!"})
  }
});

module.exports = router;
