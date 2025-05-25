const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const userController = require("../controllers/user.controller");

router.post(
    "/register",
    [
        body("email").isEmail().withMessage("Invalid-Email"),
        body("fullname").isLength({min:3}).withMessage("First name must be at least 3 character long."),
        body("password").isLength({min:3}).withMessage("password must be at least 3 character long")
    ],
    userController.registerUser
);


module.exports = router;