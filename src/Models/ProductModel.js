const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    
    Name: {
        type: String,
        required: true,
        unique: true,
       // trim: true
    },

    PackegeSize : {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        trim: true
    },

    Category : {
        type: String,
        required: true
    },
   
    MRP: { 
        type: Number,
        required: true,
        trim: true
    },
    
    status : {
        type: String,
        required: true,
        enum: ['active', 'inactive'],
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    },
   

    // currencyId: { //INR
    //     type: String,
    //     required: true,
    //     trim: true
    // },

    // currencyFormat: { //Rupee symbol
    //     type: String,
    //     required: true,
    //     trim: true
    // },

    // productImage: { // s3 link
    //     type: String,
    //     required: true,
    //     trim: true
    // },

},
    { timestamps: true }
)   
module.exports = mongoose.model('Products', productSchema)