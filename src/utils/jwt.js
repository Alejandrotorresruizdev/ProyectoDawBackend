const {sign} = require('jsonwebtoken');
const {JWT_SECRET} = require("./index");

const {hashSync, genSaltSync } = require("bcryptjs");

const jwtFunctions = {};

jwtFunctions.generateToken = user => {
    return sign({user}, JWT_SECRET,{expiresIn:"4h"})
}

jwtFunctions.generateRandomPassword = () => {
    let randomPassword = '';
    for (let i = 0; i < 10; ++i) {
        randomPassword += (Math.floor(Math.random() * 16)).toString(16);
    }
    return randomPassword;
}


jwtFunctions.hashedPassword = async (password) =>{
    const salt = await genSaltSync(10);
    const hashedPassword = await hashSync(password, salt);
    return hashedPassword;
}

module.exports = jwtFunctions;