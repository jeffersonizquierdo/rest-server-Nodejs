const {Schema, model} = require('mongoose');


const productSchema = Schema({

    name:{
        type: String,
        required: [true, 'The name is required'],
        unique: true
    },

    status: {
        type:Boolean,
        default: true,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    price: {
        type: Number,
        default: 0
    },

    categorie: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true
    },

    description: {type: String},
    available: {type: Boolean, default: true}

});


productSchema.methods.toJSON = function() {

    const { __v, status, _id, ...product } = this.toObject();
    product.uid = _id;
    return product;
}


module.exports = model( 'Product', productSchema );