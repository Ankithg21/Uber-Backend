const captionModel = require("../models/caption.models");
const {validationResult} = require("express-validator");
const captionService = require("../services/caption.service");

const registerCaption = async(req,res)=>{
    const errors = validationResult(req.body);
    if(!errors.isEmpty()){
        return res.status(400).json({ error: errors.array() });
    }
    const {fullname, email, password, vehicle} = req.body;

    const isCaptionAlreadyExist = await captionModel.findOne({email});
    if(isCaptionAlreadyExist){
        return res.status(400).json(
            {message: "Caption already exist."},
        );
    }

    const hashedPassowrd =await captionModel.hashPassword(password);

    const caption =await captionService.createCaption({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassowrd,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
        
    });
    const token = caption.generateAuthToken();

    return res.status(201).json(
        {token, caption},
    );
}


module.exports = {
    registerCaption,
}

