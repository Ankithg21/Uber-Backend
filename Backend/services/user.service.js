const userModel = require("../models/user.model");

const createUser = async({fullname, email, password})=>{
    if(!fullname || !email || !password){
        throw new Error("All fields are required.");
    }
    const firstname = fullname.firstname;
    const lastname = fullname.lastname;
    const user = userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    });
    return user;
};

module.exports = {
    createUser,
}