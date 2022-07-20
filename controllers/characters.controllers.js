const { response } = require('express');
const Character = require('../models/character');
const Movie = require('../models/movie');
const { uploadNewFile } = require('../helpers/upload-file');
const { Op } = require("sequelize");

const getCharacters = async (req, res = response) => {

    const { name, age, movies } = req.query;
    if (name) {

        const findName = name ? name : '';

        const characters = await Character.findAll({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.substring]: findName
                    }
                }]
            },
            attributes: ['name', 'img']
        })

        return res.json({ data: characters })

    }

    if (age) {

        const findAge = age ? age : '';

        const characters = await Character.findAll({
            where: {
                [Op.or]: [{
                    age: {
                        [Op.like]: findAge
                    }
                }]
            },
            attributes: ['name', 'img']
        })

        return res.json({ data: characters })

    }

    if (movies) {

        const movie = await Movie.findByPk(movies, { 
            include: [{
                model: Character,
                attributes: ['name', 'img'],
                through: {
                    attributes: []
                }
            }] 
        });
        const characters = movie.characters;


        return res.json({ data: characters })

    }

    const characters = await Character.findAll({ attributes: ['name', 'img'] });

    res.json({
        data: characters
    })

}

const getCharacterDetails = async (req, res) => {

    const { idChar } = req.params;

    const character = await Character.findByPk(idChar, { include: Movie });

    if (!character) {
        return res.status(400).json({
            msg: `El Personaje con ID ${idChar} no existe.`
        })
    }

    const characterMovies = await Character.findOne({
        where: {
            id: idChar
        },
        include: [{
            model: Movie,
            attributes: ['title', 'img'],
            through: {
                attributes: []
            }
        }]
    });


    res.json({
        // movies,
        data: characterMovies
    })

}

const postCharacter = async (req, res) => {

    try {

        const { name, age, weight, story } = req.body;
        const character = await Character.findOrCreate({
            where: { name: name },
            defaults: {
                name,
                age,
                weight,
                story
            }
        })

        const characterExists = character[1];
        if (!characterExists) {
            return res.status(400).json({
                msg: `El personaje "${name}" ya existe.`
            })
        }

        const characterData = character[0];
        const image = await uploadNewFile(req.files, ['png', 'jpg', 'jpeg', 'gif'], 'characters');
        characterData.img = `/uploads/characters/${image}`;
        await characterData.save();

        res.json({
            data: characterData
        })

    } catch (err) {

        console.log(err);
        return res.status(500).json({
            msg: 'Error en postCharacter desde "characters.controllers.js", hable con un administrador.'
        })

    }


}

const updateCharacter = async (req, res) => {

    try {

        const { idChar } = req.params;
        const { name, age, weight, story } = req.body;

        const character = await Character.findByPk(idChar)
        let characterExists;
        if (name) {
            characterExists = await Character.findOne({ where: { name: name } });
        }

        if (!character) {
            return res.status(400).json({
                msg: 'Este personaje no existe.'
            })
        }

        if (characterExists) {
            return res.status(400).json({
                msg: 'Este nombre ya está en uso.'
            })
        }

        if (req.files) {
            const image = await uploadNewFile(req.files, ['png', 'jpg', 'jpeg', 'gif'], 'characters');
            character.img = `/uploads/characters/${image}`;
            await character.save();
        }

        if (name) character.name = name;
        if (age) character.age = age;
        if (weight) character.weight = weight;
        if (story) character.story = story;

        character.save();

        res.json(character)

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Error al actualizar personaje.'
        })
    }

}

const deleteCharacter = async (req, res) => {

    const { idChar } = req.params;
    const character = await Character.findByPk(idChar)

    if (!character) {
        return res.json({
            msg: 'Este personaje no existe.'
        })
    }

    character.destroy();

    res.json({
        msg: 'Personaje Eliminado.'
    })
}

const addNewMovie = async (req, res) => {

    const { idChar, movieId } = req.params;

    const character = await Character.findByPk(idChar);
    const movie = await Movie.findByPk(movieId);

    if (!character || !movie) {
        return res.status(400).json({
            msg: 'La pelicula o personaje no existen.'
        })
    }

    character.addMovie(movie);

    res.json({
        msg: 'Película agregada.'
    })

}

module.exports = {
    getCharacters,
    getCharacterDetails,
    postCharacter,
    updateCharacter,
    deleteCharacter,
    addNewMovie
}