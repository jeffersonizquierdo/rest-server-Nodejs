const mongoose = require('mongoose');


const DBConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('base de datos online');

    } catch (error) {

        throw new Error('Error de base de datos');
    }
}


module.exports = {
    DBConnection
}