const { response } = require("express");
const Product = require("../models/Product.models");


const createProduct = async(req, res = response) => {

    const name = req.body.name.toUpperCase();
    const { price, description, categorie } = req.body;
    const data = {
        name,
        price,
        description,
        user: req.autenticatedUser._id,
        categorie: categorie
    }

    let product = new Product( data );
    await product.save();

    res.json(product);

}


const getAllProducts = async (req, res = response) => {

    const {limit = 20, start = 0} = req.query;
    const query = {status:true};

    const [total, products] = await Promise.all([

        Product.countDocuments(query).populate('Categorie', 'name'),
        Product.find(query)
        .skip(start)
        .limit(limit),
        
    ]);

    res.json({
        total,
        products
    });
}


const getProductById = async(req, res = response) => {

    const {id} = req.params;
    const product = await Product.findById(id);

    res.json(product);
} 


const upddateProductById = async(req, res = response) =>{

    const {id} = req.params;
    const { name, price, description, available} = req.body;

    const data = { name, price, description, available};

    const product = await Product.findByIdAndUpdate(id, data, {new:true});

    res.json(product);
}

const deleteProductById = async(req, res = response) => {

    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, { status: true }, {new:true});

    res.json({msg: 'product delete successful', product});



}



module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    upddateProductById,
    deleteProductById
}