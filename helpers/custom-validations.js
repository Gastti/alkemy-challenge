const scoreValidator = async (score) => {

    if (score) {
        if (score < 1 || score > 5 || isNaN(score)) {
            throw new Error('La calificación debe ser un número entre el 1 y el 5.');
        }
    }

}

const genreValidator = async (genre) => {

    if (genre) {
        if (genre < 1 || genre > 10 || isNaN(genre)) {
            throw new Error('Debes introducir un ID de género existente. Lista de Generos: 1: Acción, 2: Aventuras, 3: Ciencia Ficción, 4: Comedia, 5: Documental, 6: Drama, 7: Fantasía, 8: Musical, 9: Suspenso, 10: Terror');
        }
    }

}

module.exports = {
    scoreValidator,
    genreValidator
}