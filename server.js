const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const users = require('./routes/api/users')

//DB initialization
const db = require('./config/keys').mongoURI
mongoose.connect(db, {useNewUrlParser:true})
.then(()=>console.log('MongoDB Connected'))
.catch((err)=>console.log(err))

//Express initialization
const app = express()

//Middleware initialization: body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//Setting server
const port = process.env.PORT || 5000
app.listen(port, ()=>console.log(`Server is running on port ${port}`))

//Using api route
app.use('/api/users', users)



