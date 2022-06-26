const scoreValidator = async (score) => {

    if (score < 1 || score > 5 || isNaN(score)) {
        throw new Error('La calificación debe ser un número entre el 1 y el 5.');
    }

}

const genreValidator = async (genre) => {

    if (genre < 1 || genre > 10 || isNaN(genre)) {
        throw new Error('Debes introducir un ID de género existente.\n Lista de Generos: \n 1: Acción\n 2: Aventuras\n 3: Drama\n 4: Ciencia Ficción\n 5: Comedia\n 6: Fantasia\n 7: Documental\n 8: Musical\n 9: Suspenso\n 10: Terror');
    }

}

module.exports = {
    scoreValidator,
    genreValidator
}