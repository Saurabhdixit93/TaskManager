const mongoose = require('mongoose');

// Creating task Schema
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
},{timestamps:true});


// exporting to use in project

module.exports = mongoose.model('UserModel', userSchema);