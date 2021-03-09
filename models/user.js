const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const userSchema    = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    accountNumber: {
        type: Number,
        unique: true,
        required: true
    },
    emailAddress: {
        type: String,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: true
    },
    identityNumber: {
        type: Number,
        unique: true,
        required: true
    }
    
    
})

const User      =   mongoose.model('User Data', userSchema)
module.exports  =   User