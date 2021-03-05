const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const propertiesUrl = require('./routes/properties')

const app = express()
const port = process.env.PORT || 5000

dotenv.config()

// Middleware
app.use(cors())
app.use(express.json())
//app.use(bodyParser.urlencoded({ extended: true }))
//app.use(bodyParser.json())
app.use('/app', propertiesUrl)

// connect to Mondo DB
const uri = process.env.ATLAS_URI

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB connected successfully")
})

// Start backend server listening
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})