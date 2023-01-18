const { response } = require("express");
const { User, Categorie, Product } = require("../models");
const { ObjectId } = require('mongoose').Types;

const collectionsAllowed = [
    'users',
    'categories',
    'products',
    'roles'
];


const search = (req, res = response) => {

    const { collection, term } = req.params; 
    if ( !collectionsAllowed.includes( collection ) ) {
        return res.status(400).json({
            msg: `The collection allowed are: ${ collectionsAllowed } `
        })
    }

    switch (collection) {

        case 'users':
            searchUsers(term, res);
            break;

        case 'categories':
            searchCategories(term, res);
            break;

        case 'products':
            searchProducts(term, res);
            break;

        default: 
            res.status(500).json({msg: 'I forgot to do this search'})
    }
}


const searchUsers = async (term = '', res = response) => {

    const isMongoId = ObjectId.isValid( term );

    if (isMongoId){

        const user = await User.findById(term);
        return res.json({ 
            result: (user) ? [ user ]: [] 
        });
    }

    const regex = new RegExp(term, 'i');
    const users = await User.find({
        $or: [{name: regex}, {email: regex}]
    });
    
    const total = users.length; 
    

    return res.json({
        total,
        results: users
    });
}


const searchCategories = async (term = '', res = response) => {

    const isMongoId = ObjectId.isValid( term );

    if (isMongoId){

        const categorie = await Categorie.findById(term);
        return res.json({ 
            result: (categorie) ? [ categorie ]: [] 
        });
    }

    const regex = new RegExp(term, 'i');
    const categories= await Categorie.find({
        name: regex, 
        status: true
    });

    const total = categories.length;

    return res.json({
        total,
        results: categories
    });
}


const searchProducts = async (term = '', res = response) => {

    const isMongoId = ObjectId.isValid( term );

    if (isMongoId){

        const product = await Product.findById(term).populate('categorie', 'name');
        return res.json({ 
            result: (product) ? [ product ]: [] 
        });
    }

    const regex = new RegExp(term, 'i');
    const products= await Product.find({
        name: regex, 
        status: true
    }).populate('categorie', 'name');;

    const total = products.length;

    return res.json({
        total,
        results: products
    });
}






module.exports = {
    search,
}