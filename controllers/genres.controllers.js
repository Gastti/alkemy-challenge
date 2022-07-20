const Movie = require('../models/movie');
const Genre = require('../models/genre');
const { uploadNewFile } = require('../helpers/upload-file');

const getGenres = async (req, res) => {

    const genres = await Genre.findAll({ attributes: ['id', 'name', 'img']});

    res.json({
        data: genres
    })
}

const getGenreDetail = async (req, res) => {

    const { idGenre } = req.params;
    const genre = await Genre.findOne({ 
        where: { id: idGenre},
        include: {
            model: Movie,
            as: 'movies',
            attributes: ['title', 'img']
        }
    })

    if (!genre) {
        return res.status(400).json({
            msg: `No existe un género con id ${idGenre}`
        })
    }

    res.json({genre})

}

const postGenre = async (req, res) => {

    try {

        const { name } = req.body;
        const genre = await Genre.findOrCreate({
            where: { name },
            defaults: {
                name
            }
        });

        const genreExists = genre[1];
        if (!genreExists) {
            return res.status(400).json({
                msg: `El género "${name}" ya existe.`
            })
        }

        const genreData = genre[0];
        const image = await uploadNewFile(req.files, ['png', 'jpg', 'jpeg', 'gif'], 'genres');
        genreData.img = `/uploads/genres/${image}`;

        await genreData.save();

        res.json({
            data: genreData
        })

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Error en postGenre desde "genres.controllers.js", hable con un administrador.'
        })
    }

}

module.exports = {
    getGenres,
    getGenreDetail,
    postGenre

}