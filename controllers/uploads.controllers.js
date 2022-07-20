const path = require('path')
const fs = require('fs')

const getCharacterImage = async (req, res) => {

    const { id } = req.params;

    const pathImage = path.join(__dirname, '../uploads/characters', id );
    if (fs.existsSync(pathImage)) {
        return res.sendFile(pathImage)
    }

    res.status(400).json({
        msg: 'No existe esta imagen.'
    })

}

const getMovieImage = async (req, res) => {

    const { id } = req.params;

    const pathImage = path.join(__dirname, '../uploads/movies', id );
    if (fs.existsSync(pathImage)) {
        return res.sendFile(pathImage)
    }

    res.status(400).json({
        msg: 'No existe esta imagen.'
    })

}

const getGenreImage = async (req, res) => {

    const { id } = req.params;

    const pathImage = path.join(__dirname, '../uploads/genres', id );
    if (fs.existsSync(pathImage)) {
        return res.sendFile(pathImage)
    }

    res.status(400).json({
        msg: 'No existe esta imagen.'
    })

}

module.exports = {
    getCharacterImage,
    getMovieImage,
    getGenreImage
}