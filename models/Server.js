const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload')

const { DBConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express()    
        this.port = process.env.PORT || 3000;

        this.path = {

            auth:      '/hello/auth',
            categories:'/hello/categories',
            products:  '/hello/products',
            search:    '/hello/search',
            users:     '/hello/users',
            uploads:   '/hello/uploads',

        }

        // Conectar base de datos
        this.ConnectDB();
        // Midlewares
        this.middlewares();
        //lectura y escritura del body
        this.app.use( express.json() )
        // rutas de mi aplicacion
        this.routes();
        //uploadFIle
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));

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
        
        this.app.use(this.path.auth,      require('../routes/auth.routes') );
        this.app.use(this.path.categories,require('../routes/categories.routes') );
        this.app.use(this.path.users,     require('../routes/Users.routes') );
        this.app.use(this.path.products,  require('../routes/products.routes') );
        this.app.use(this.path.search,    require('../routes/search.routes') );
        this.app.use(this.path.uploads,   require('../routes/uploads.routes') );


    }


    listen(){

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        });
    }


}

module.exports = Server;
