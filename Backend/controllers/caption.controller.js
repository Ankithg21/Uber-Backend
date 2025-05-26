const captainModel = require("../models/caption.models");
const {validationResult} = require("express-validator");
const captainService = require("../services/caption.service");
const blacklistTokenModel = require("../models/blacklistToken.model");

const registerCaptain = async(req,res)=>{
    const errors = validationResult(req.body);
    if(!errors.isEmpty()){
        return res.status(400).json({ error: errors.array() });
    }
    const {fullname, email, password, vehicle} = req.body;

    const isCaptionAlreadyExist = await captainModel.findOne({email});
    if(isCaptionAlreadyExist){
        return res.status(400).json(
            {message: "Caption already exist."},
        );
    }

    const hashedPassowrd =await captainModel.hashPassword(password);

    const captain =await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassowrd,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
        
    });
    const token = captain.generateAuthToken();

    return res.status(201).json(
        {token, captain},
    );
}

const loginCaptain = async(req,res)=>{
    const errors = validationResult(req.body);
    if(!errors.isEmpty()){
        return res.status(400).json({ error: errors.array() });
    }
    const {email, password} = req.body;
    const captainExist = await captainModel.findOne({email}).select('+password');
    if(!captainExist){
        return res.status(400).json(
            {message: "Caption not yet registered."}
        );
    }
    const isValidPassword = await captainExist.verifyPassword(password);
    if(!isValidPassword){
        return res.status(400).json(
            {message: "Incorrect password, please enter correct password."},
        );
    }
    const token =await captainExist.generateAuthToken();
    res.cookie('token', token);
    return res.status(200).json(
        {token, captainExist},
    );
};

const getCaptainProfile = async(req,res)=>{
    res.status(200).json(req.captain);
};

const logoutCaptain = async(req,res)=>{
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    res.clearCookie('token');
    await blacklistTokenModel.create({token});
    return res.status(200).json(
        {message: "Logged out Successfully."},
    );
};

module.exports = {
    registerCaptain,
    loginCaptain,
    getCaptainProfile,
    logoutCaptain,
}

