const mongoose = require('mongoose');

const userSchemas = new mongoose.Schema({
    fullname:{
        type: String,
        required: [true, "Fullname is required"]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    }
})

const userModels = mongoose.model("User", userSchemas);
module.exports = userModels;