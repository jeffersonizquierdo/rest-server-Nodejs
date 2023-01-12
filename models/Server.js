const express = require('express');
const cors = require('cors');
const { DBConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express()    
        this.port = process.env.PORT;
        this.userPath = '/hello/users';


        // Conectar base de datos
        this.ConnectDB();

        // Midlewares
        this.middlewares();

        //lectura y escritura del body
        this.app.use( express.json() )
        

        // rutas de mi aplicacion
        this.routes();

    }

    async ConnectDB() {

        await DBConnection();
    }


    middlewares(){

        //cors 
        this.app.use( cors() ); 
        //directorio publico
        this.app.use( express.static('public') );
    }

    
    routes(){

        this.app.use(this.userPath, require('../routes/Users.routes') )

    }


    listen(){

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        });
    }


}

module.exports = Server;