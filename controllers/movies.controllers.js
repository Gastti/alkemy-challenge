const { response } = require('express');
const { Op } = require("sequelize");
const Movie = require('../models/movie');
const Genre = require('../models/genre');
const Character = require('../models/character');

const getMovies = async (req, res = response) => {

    try {

        const { name, genre, order } = req.query;

        if (name) {
            const movies = await Movie.findAll({
                where: { title: name },
                attributes: ['title', 'image']
            });

            return res.json({
                data: movies
            })
        }

        if (order) {
            const movies = await Movie.findAll({ order: [['id', order]] })

            return res.json({
                data: movies
            })
        }

        const movies = await Movie.findAll({ attributes: ['title', 'image'] });

        res.json({
            data: movies
        })

    } catch (err) {

        console.log(err);
        return res.status(500).json({
            msg: 'Error en "movies.controllers.js", hable con un administrador.'
        })

    }

}

const getMovieDetails = async (req, res) => {

    try {

        const { idMovie } = req.params;

        if (isNaN(idMovie)) {
            return res.status(400).json({
                msg: 'No es un ID válido.'
            })
        }

        const movie = await Movie.findByPk(idMovie);

        if (!movie) {
            return res.status(400).json({
                msg: `No existe una película/serie con ID ${idMovie}.`
            })
        }

        const movieDetails = await Movie.findOne({
            where: { id: idMovie },
            include: [
                {
                    model: Character,
                    attributes: ['name', 'image'],
                    through: {
                        attributes: []
                    }
                }, {
                    model: Genre,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }]
        })

        res.json({
            data: movieDetails
        })

    } catch (err) {

        console.log(err);
        return res.status(500).json({
            msg: 'Error en "movies.controllers.js", hable con un administrador.'
        })

    }

}

const postMovie = async (req, res) => {

    try {

        const { image, title, score, genre } = req.body;
        const movie = await Movie.findOrCreate({
            where: { title: title },
            defaults: {
                image,
                title,
                score
            }
        });

        const movieCreated = movie[0];
        movieCreated.addGenre(genre);

        const movieExists = movie[1];

        if (!movieExists) {
            return res.status(400).json({
                msg: `La pelicula "${title}" ya existe.`
            })
        }

        res.json({
            data: movieCreated
        })

    } catch (err) {

        console.log(err);
        return res.status(500).json({
            msg: 'Error en postMovie desde "movies.controllers.js", hable con un administrador.'
        })

    }

}

const updateMovie = async (req, res) => {

    try {

        const { idMovie } = req.params;
        const { image, title, score } = req.body;

        const movie = await Movie.findByPk(idMovie);
        const movieExists = await Movie.findOne({ where: { title: title } });

        if (!movie) {
            return res.status(400).json({
                msg: 'Esta película no existe.'
            })
        }

        if (movieExists) {
            return res.status(400).json({
                msg: 'Este nombre ya está en uso.'
            })
        }

        if (image) movie.image = image;
        if (title) movie.title = title;
        if (score) movie.score = score;

        movie.save();

        res.json(movie)

    } catch (err) {

        console.log(err);
        return res.status(500).json({
            msg: 'Error al actualizar la película.'
        })

    }

}

const deleteMovie = async (req, res) => {

    try {
        const { idMovie } = req.params;

        if (isNaN(idMovie)) {
            return res.status(400).json({
                msg: 'No es un ID válido.'
            })
        }

        const movie = await Movie.findByPk(idMovie);

        if (!movie) {
            return res.status(400).json({
                msg: `No existe una película con el ID ${idMovie}`
            })
        }

        movie.destroy();
        res.json({
            msg: 'Película eliminada.'
        })
    } catch (err) {

        console.log(err);
        return res.status(500).json({
            msg: 'Error en "movies.controllers.js", hable con un administrador.'
        })

    }
}

const addCharacter = async (req, res) => {

    const { idMovie, idChar } = req.params;

    const movie = await Movie.findByPk(idMovie);
    const character = await Character.findByPk(idChar);

    if (!movie || !character) {
        return res.status(400).json({
            msg: 'La película o personaje no existen.'
        })
    }

    movie.addCharacter(character);

    res.json({
        msg: 'Personaje agregado.'
    })

}

module.exports = {
    getMovies,
    getMovieDetails,
    postMovie,
    updateMovie,
    deleteMovie,
    addCharacter
}