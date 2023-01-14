const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/User.models')
const { generateJWT } = require('../helpers/generateJWT')

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try { 
        //verificar si el email existe
        const user = await Usuario.findOne( {email} );
            if ( !user ) return res.status(400).json({ msg : 'User or password incorrect - email' });
        //verify si el usuario esta
            if ( !user.status ) return res.status(400).json({ msg : "Unregistered user - status : false " });
        //verify la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
            if ( !validPassword ) return res.status(400).json({ msg : 'User or password incorrect - password' });

        //create el JWT
        const token = await generateJWT( user.id );

        res.json({ user, token });
        
    } catch (error) {

        console.log(error);

        res.status(500).json( {

            msg: 'Talk to the administrator'
        })
        
    }


}

module.exports = {
    login
}