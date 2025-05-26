const captainModel = require("../models/caption.models");
const {validationResult} = require("express-validator");
const captainService = require("../services/caption.service");

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


module.exports = {
    registerCaptain,
}

