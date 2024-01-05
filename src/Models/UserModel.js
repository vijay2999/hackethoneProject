const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone: {
        type: Number,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    }, 
    
}, { timestamps: true })

module.exports = mongoose.model('users', userSchema)