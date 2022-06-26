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
            characters: '/characters',
            movies: '/movies',
            auth: '/auth',
            upload: '/upload'
        }

        this.connectToDatabase();
        this.middlewares();
        this.routes();
    }

    async connectToDatabase() {
        try {

            const genres = [
                { name: 'Acción', image: 'non-image.png' },
                { name: 'Aventuras', image: 'non-image.png' },
                { name: 'Ciencia Ficción', image: 'non-image.png' },
                { name: 'Comedia', image: 'non-image.png' },
                { name: 'Documental', image: 'non-image.png' },
                { name: 'Drama', image: 'non-image.png' },
                { name: 'Fantasía', image: 'non-image.png' },
                { name: 'Musical', image: 'non-image.png' },
                { name: 'Suspenso', image: 'non-image.png' },
                { name: 'Terror', image: 'non-image.png' }
            ]

            await db.sync({ force: true }).then(() => {
                console.log('Database Online.'.green);
            }).then(() => {
                // Crear Generos
                genres.forEach(genre => Genre.create(genre))
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
        this.app.use(this.paths.characters, require('../routes/characters')),
            this.app.use(this.paths.movies, require('../routes/movies')),
            this.app.use(this.paths.auth, require('../routes/auth')),
            this.app.use(this.paths.upload, require('../routes/upload'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`${'Servidor corriendo en puerto'.green}`);
        });
    }

}

module.exports = Server;