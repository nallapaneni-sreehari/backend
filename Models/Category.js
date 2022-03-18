const mongoose = require('mongoose');
const schema = mongoose.Schema;

var CategorySchema = new schema({
    name: String,
    items: Array
});

module.exports.Category = new mongoose.model('Category', CategorySchema);