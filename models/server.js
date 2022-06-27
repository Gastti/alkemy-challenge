const express = require('express');
const cors = require('cors');
const db = require('../database/config');
const colors = require('colors');
const Genre = require('./genre');
const fileUpload = require('express-fileupload');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.paths = {
            auth: '/auth',
            characters: '/characters',
            genres: '/genres',
            movies: '/movies',
            upload: '/upload'
        }

        this.connectToDatabase();
        this.middlewares();
        this.routes();
    }

    async connectToDatabase() {
        try {

            await db.sync({ force: false }).then(() => {
                console.log('Database Online.'.green);
            })

        } catch (err) {
            throw new Error(err)
        }
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y Parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));

        // Fileuploads
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth')),
        this.app.use(this.paths.characters, require('../routes/characters')),
        this.app.use(this.paths.genres, require('../routes/genres')),
        this.app.use(this.paths.movies, require('../routes/movies')),
        this.app.use(this.paths.upload, require('../routes/upload'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`${'Servidor corriendo en puerto'.green}`);
        });
    }

}

module.exports = Server;