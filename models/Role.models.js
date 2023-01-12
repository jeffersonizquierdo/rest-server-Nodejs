const {Schema, model} = require('mongoose');


const rolesSchema = Schema({

    role:{
        type: String,
        required: [true, 'The role is required']
    }
});


module.exports = model( 'Role', rolesSchema )