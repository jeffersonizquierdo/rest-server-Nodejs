const {Schema, model} = require('mongoose');


const categorieSchema = Schema({

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
    }
});


categorieSchema.methods.toJSON = function() {

    const { __v, status, _id, ...categorie } = this.toObject();
    categorie.uid = _id;
    return categorie;
}


module.exports = model( 'Categorie', categorieSchema );