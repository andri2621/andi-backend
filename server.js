const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const userRoute = require('./routes/user')

mongoose.connect('mongodb+srv://andi:andi@andisetiawan.eervt.mongodb.net/AndiSetiawan?retryWrites=true&w=majority', 
{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex : true})
const db= mongoose.connection


db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connect ')
})
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server is Running in port ${PORT}`)
})

app.use('/api/user', userRoute)