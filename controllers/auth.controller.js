const {response, json} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/User.models')
const { generateJWT } = require('../helpers/generateJWT');

const { googleVerify } = require('../helpers/googleVerify');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try { 
        //verificar si el email existe
        const user = await User.findOne( {email} );
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


const googleSingIn = async ( req, res = response ) => {

    try {
        const { id_token } = req.body;


        const { name, img, email} = await googleVerify(id_token);

        let user = await User.findOne( {email} );

        if (!user){
            // si no existe en DB crearlo
            const data = {
                name,
                email,
                password : ':p',
                img,
                google: true
            }
            user = new User(data);

            console.log(user);
            await user.save();
        }

        if (!user.status) {

            return res.status(401).json({
                msg : 'Talk to administrator - Blocked user'
            })

        }

        const token = await generateJWT(user.id);

        
        res.json({
    
            msg : 'Todo bien',
            user,
            id_token
        })
        
    } catch (error) {

        res.status(400).json({
            ok:false,
            msg : 'The token could not be verified'
        })
        
    }


}

module.exports = {
    login,
    googleSingIn
}