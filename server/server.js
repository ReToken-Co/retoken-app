const express = require('express')
const cors = require('cors')
const path = require("path")
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const propertiesUrl = require('./routes/properties')

const app = express()
const port = process.env.PORT || 5000

dotenv.config()

// Middleware
app.use(cors())
app.use(express.json())

// Serve MongoDB API call
app.use('/api', propertiesUrl)

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '../client/build/index.html'))
    })
} else {
    app.use('/api', propertiesUrl)
}

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