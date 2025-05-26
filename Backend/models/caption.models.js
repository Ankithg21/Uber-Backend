const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required:true,
            minLength:[3, "Firtname must be at least 3 character long."]
        },
        lastname:{
            type: String,
            minLength:[3, "Lastname must be at least 3 character long"],
        }
    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    socketId:{
        type: String,
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            minLength: [3, "Color must be at least 3 character long."],
        },
        plate:{
            type: String,
            required: true,
            minLength: [3, "plate must be at least 3 characer long."],
        },
        capacity:{
            type: Number,
            required: true,
            minLength: [1, "Capacity must be at least 1."],
        },
        vehicleType:{
            type: String,
            enum: ["auto", "car", "motorcycle"],
            required: true,
        },
    },
    location:{
        latitude:{
            type: Number,
        },
        longitude:{
            type: Number,
        }
    },
});

captainSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {_id: this._id},
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, Number(process.env.HASH_ROUND));
};

captainSchema.methods.verifyPassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

const captainModel = mongoose.model("captainModel", captainSchema);

module.exports = captainModel;