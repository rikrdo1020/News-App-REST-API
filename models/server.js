
const express = require('express')
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app  = express()
        this.port = process.env.PORT || 3000;

        this.paths = {
            auth: '/api/auth/',
            users: '/api/users',
            news:   '/api/news',
        }
        // Connectar a base de datos
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );


        //Directorio publico
        this.app.use( express.static('public') )

    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.users, require('../routes/user'));
        this.app.use(this.paths.news, require('../routes/new'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Server running on', this.port )
            console.log('--------------------------')
        })
    }
}

module.exports = Server;