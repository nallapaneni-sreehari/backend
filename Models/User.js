const mongoose = require('mongoose');
const schema = mongoose.Schema;

var UserSchema = new schema({
    name: String,
    email: String,
    password: String,
    continent: String,
    country: String,
    address: String,
    language: String,
    mobile: String,
    token: String,
    isActive: Number,
    isDeleted : Number,
    lastLogin : Date,
    ipAddress:String
});

module.exports = mongoose.model('Users', UserSchema, "Users");