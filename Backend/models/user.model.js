const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    fullname:{
        firstname:{
        type: String,
        required: true,
        minlength:[3, "First name must be at least 3 characters"]
        },
        lastname:{
            type: String,
            minlength:[1, "last name must be at least 1 character"]
        },
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

userSchema.methods.generateAuthToken = async function () {
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } 
    );
};

userSchema.methods.verifyPassword =async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword =async function(password){
    return await bcrypt.hash(password, Number(process.env.HASH_ROUND));
};

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;