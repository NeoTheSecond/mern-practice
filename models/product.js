const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    pic: {
        type: String,
    },
    price: {
        type: Number,
    },
    sale: {
        type: Number,
    },
    customizeOptions: [Schema.Types.Mixed]
}, {strict: false});

module.exports = Product = mongoose.model('product', ProductSchema);
