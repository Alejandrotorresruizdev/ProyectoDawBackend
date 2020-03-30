const {sign} = require('jsonwebtoken');
const {JWT_SECRET} = require("./index");


const jwtFunctions = {};

jwtFunctions.generateToken = function(user){
    return sign({user}, JWT_SECRET,{expiresIn:"4h"})
}

module.exports = jwtFunctions;