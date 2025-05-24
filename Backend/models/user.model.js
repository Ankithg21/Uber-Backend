const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    fullname:{
        type: String,
        required: true,
        minlength:[3, "First name must be at least 3 characters"]
    },
    lastname:{
        type: String,
        minlength:[1, "last name must be at least 1 character"]
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength:[5, "Email must be atleast 5 character long"]
    },
    password: {
        type: String,
        required: true,
    },
    socketId: {
        type: String
    }
});

userSchema.statics.hashPassword = function(password){
    return bcrypt.hash(password, process.env.HASH_ROUND);
};

userSchema.methods.generateAuthToken = async function (){
    return jwt.sign({_id: this._id}, process.env.JWT_SECRET);
};

userSchema.methods.verifyPassword = function(password){
    return bcrypt.compare(this.password, password);
}

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;