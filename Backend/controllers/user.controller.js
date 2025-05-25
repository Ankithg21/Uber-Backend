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

const loginUser = async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
        return res.status(401).json({ message: "User not yet Registered." });
    }

    const isValidPassword = await existingUser.verifyPassword(password);
    if (!isValidPassword) {
        return res.status(401).json({ message: "Incorrect password, Please enter valid Password." });
    }

    const token = await existingUser.generateAuthToken();
    return res.status(200).json({ token, existingUser });
};


module.exports = {
    registerUser,
    loginUser,
}