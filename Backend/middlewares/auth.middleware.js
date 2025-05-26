const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blackListModel = require("../models/blacklistToken.model");
const captainModel = require("../models/caption.models");

const authUser = async(req, res, next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json(
            {message: "Token not found-Unauthorized."},
        );
    }
    const isblackListed = await blackListModel.findOne({token: token});
    if(isblackListed){
        return res.status(400).json(
            {message: "please Login you are Unauthorized."},
        );
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({_id: decoded});
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json(
            {message: "Unauthorized!"},
        );
    }
};

const authCaptain = async(req,res,next)=>{
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json(
            {message: "Token not found-Unauthorized."},
        );
    }
    const isblackListed = await blackListModel.findOne({token: token});
    if(isblackListed){
        return res.status(400).json(
            {message: "you are unauthorized, please login."},
        );
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findOne({_id: decoded._id});
        req.captain = captain;
        return next();
    } catch (error) {
        return res.status(401).json(
            {message: "Unauthorized!"},
        );
    }
};

module.exports = {
    authUser,
    authCaptain,
}