const { Categorie } = require('../models');
const Product = require('../models/Product.models');
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


const existsCategorieById = async( id = '') => {

    const existsCatego = await Categorie.findOne({_id:id, status : true});
    if (!existsCatego) throw new Error(`this category don't exist`);
}


const existsProductByName = async( name = '' ) => {


    const product = await Product.findOne( {name : name, status : true} )
    if (product) throw new Error(`The product ${name} alredy exist`);
}


const existsProductById = async(id = 0) => {

    const product = await Product.findOne( {_id : id} )
    if (!product) throw new Error(`The product with ID ${_id} don't exist`);
}


module.exports = {
    isRoleValid,
    existsEmail,
    existsUserById,
    existsCategorieById,
    existsProductByName,
    existsProductById
}