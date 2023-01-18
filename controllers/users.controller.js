const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/User.models');




const getUsers = async(req = request, res = response) => {
    
    const {limit = 20, start = 0} = req.query;
    const query = {status:true};

    // const users = await User.find(query)
    // .skip(start)
    // .limit(limit)

    // const count = await User.countDocuments(query);

    const [users, total] = await Promise.all([

        User.find(query)
        .skip(start)
        .limit(limit),
        User.countDocuments(query)
    ])

    res.json({total, users})
};


const postUser = async(req, res) => {


    const errors = validationResult(req);
    if ( !errors.isEmpty() ) return res.status(400).json(errors)

    const {name, email, password, role} = req.body;
    const user = new User( {name, email, password, role} );


    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = await bcryptjs.hashSync( password, salt );


    //Guardar en BD
    await user.save();


    res.json({
        user
    })
};



const putUser = async(req, res = response) => {

    const id = req.params.id;
    const {_id, google, password, email, ... others} = req.body;

    //validar en base de datos
    if( password ) {

        // encriptar nueva contraseña
        const salt = bcryptjs.genSaltSync();
        others.password = await bcryptjs.hashSync( password, salt);
    }
    const user = await User.findByIdAndUpdate( id, others );

    res.json(user);
};



const deleteUser = async(req, res) => {

    const id = req.params.id;
    // uthentication
    const uid = req.uid;
    console.log('uid: ', uid);
    const autenticatedUser = req.autenticatedUser;

    if (!autenticatedUser) return res.status(401).json( { msg : 'invalid token - user not exists'} )
    if (!autenticatedUser.status) return res.status(401).json( { msg : 'invalid token - state : false'} )

    const userDelete = await User.findByIdAndUpdate( id, {status: false} )

    res.json({
        msg : 'user deleted successfully',
        userDelete,
        autenticatedUser
    })
};


const patchUser = (req, res) => {
    res.json({
        msg : 'PATCH my api - controller'
    })
};


module.exports = {
    getUsers,
    putUser,
    postUser,
    deleteUser,
    patchUser
}