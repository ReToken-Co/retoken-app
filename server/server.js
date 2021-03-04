const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const propertiesRouter = require('./routes/properties')

const app = express()
const port = process.env.PORT || 5000

dotenv.config()

// connect to Mondo DB
const uri = process.env.ATLAS_URI

//mongoose.connect(uri, () => console.log("MongoDB connected successfully") )
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB connected successfully")
})

// setup app router
app.use(express.json())
app.use(cors())
app.use('/app', propertiesRouter)

// Start Node backend server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})