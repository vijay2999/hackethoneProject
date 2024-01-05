const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    discription: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true,
    }
   
}, { timestamps: true })

module.exports = mongoose.model('category',categorySchema )