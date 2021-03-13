const express = require('express')
const cors = require('cors')
const path = require("path")
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const propertiesUrl = require('./routes/properties')

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const mongoDBUri = process.env.ATLAS_URI || 'mongodb://localhost/retoken'

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/properties', propertiesUrl)  // service MongoDB API

// Serve static assets (client) if in production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build/index.html'))
    })
} else {
    app.use(express.static(path.join(__dirname, 'client')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/public/index.html'))
    })
}

// connect to Mondo DB
mongoose.connect(mongoDBUri, { useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB connected successfully")
})

// Start backend server listening
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})