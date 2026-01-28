const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health',(req,res)=>res.json({status:'ok'}))

app.use('/auth', require('./modules/auth/auth.routes'))
app.use('/', require('./modules/videos/video.routes'))

module.exports = app
