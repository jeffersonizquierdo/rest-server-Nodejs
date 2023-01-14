const { response } = require("express");


const isAdministrator = (req, res, next) => {

        if (!req.autenticatedUser) return res.status(500).json( {msg: 'validate token before role'});
    const {role, name} = req.autenticatedUser;
    if (role !=='ADMIN_ROLE') return res.status(401).json( {msg: `${name} is not an administrator - he can't do this`});

    next();
}


const hasRole = ( ...roles ) => {



    return ( req, res, next ) => {

        if (!req.autenticatedUser) return res.status(500).json( {msg: 'validate token before role'});


        if ( !roles.includes( req.autenticatedUser.role )) {
            return res.status(401).json( {msg: `The service requires one of these roles ${roles}`});
        } 


        
        console.log(roles);
        next();
    }

}


module.exports = {
    isAdministrator,
    hasRole
}