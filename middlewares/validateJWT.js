const { response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User.models');


const  validateJWT = async (req, res = response, next) => {


    const token = req.header('token');
    console.log( 'token: ', token);

    if (!token) return res.status(401).json( {msg : 'There is no token in the request'});
    
    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETOPRIVATEKEY );

        const autenticatedUser = await User.findById( uid )
        req.autenticatedUser = autenticatedUser;
        req.uid = uid;
        next();

    } catch (error) {
        console.log(error);
        res.status(402).json( {msg : 'invalid token'} )
    }
    




}

module.exports = {
    validateJWT
}