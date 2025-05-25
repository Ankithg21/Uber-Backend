const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const {validationResult} = require("express-validator");

const registerUser = async (req, res, next)=>{
    const errors = validationResult(req.body);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array(),
        });
    }
    const {fullname, email, password} = req.body;
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
        fullname,
        email,
        password: hashedPassword
    });
    const token =await user.generateAuthToken();
    return res.status(201).json(
        {token, user}
    );
};

module.exports = {
    registerUser,
}