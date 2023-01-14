const Role = require('../models/Role.models');
const User = require('../models/User.models');


const isRoleValid = async(role = '') => {
    const existsRole = await Role.findOne( {role} );

    if(!existsRole) throw new Error(`The role ${role} not is registered in DB`)
}


const existsEmail = async(email) =>{

    const existsEmail = await User.findOne( {email} );

    if (existsEmail) throw new Error(`this email ${email} is alredy registered`);
}


const existsUserById = async(id = '') => {

    const existId = await User.findById(id);
    if (!existId) throw new Error(`The id ${id} don't exist `)
}


module.exports = {
    isRoleValid,
    existsEmail,
    existsUserById
}