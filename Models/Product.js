const mongoose = require('mongoose');
const schema = mongoose.Schema;

var ProductsSchema = new schema({
    name: String,
    price: Number,
    description: String,
    imagesUrls: Array
});

module.exports.Product = new mongoose.model('Product', ProductsSchema);