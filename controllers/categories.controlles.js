const { response } = require("express");
const { Categorie } = require('../models');


const getAllCategories = async(req, res = response) => {

    const {limit = 20, start = 0} = req.query;
    const query = {status:true};

    const [total, categories] = await Promise.all([

        Categorie.countDocuments(query),
        Categorie.find(query)
        .skip(start)
        .limit(limit),
        
    ]);


    res.json({
        total,
        categories
    });

}


const createCategorie = async(req, res = response) => {

    const name = req.body.name.toUpperCase();
    const categorieBD = await Categorie.findOne( { name : name } );

    if( categorieBD ) {
        return res.status(400).json({
            msg : `The category ${categorieBD.name} alredy exists`
        });
    }

    const data = {
        name, 
        user: req.autenticatedUser._id
    }

    const categorie = new Categorie(data);
    await categorie.save();

    res.status(201).json(categorie);
}


const getCategorieById = async (req, res = response) => {

    const {id} = req.params;
    const categorie = await Categorie.findById(id).populate('user', 'name');
    res.json(categorie);
}


const updateCategorie = async(req, res = response) => {

    const id = req.params.id;
    const  name  = req.body.name.toUpperCase();

    const categorie = await Categorie.findByIdAndUpdate(id, {name}, {new: true});

    res.json({
        msg: 'update successful',
        categorie
    });
}


const deleteCategorie = async(req, res = response) => {

    const id = req.params.id;

    const categorie = await Categorie.findByIdAndUpdate(id, { state : false }, {new:true} );

    res.json({
            msg: 'delete successful',
            categorie
        });

}


module.exports = {
    createCategorie,
    getAllCategories,
    getCategorieById,
    updateCategorie,
    deleteCategorie
}