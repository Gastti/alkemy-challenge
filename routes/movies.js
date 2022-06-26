// Imports
const { Router } = require('express');
const { check } = require('express-validator');

const {
    getMovies,
    getMovieDetails,
    postMovie,
    updateMovie,
    deleteMovie,
    addCharacter,
} = require('../controllers/movies.controllers');

const { validateForm } = require('../middlewares/form-validations');
const { JWTValidation } = require('../middlewares/jwt-validations');
const { scoreValidator, genreValidator } = require('../helpers/custom-validations')

// Routes
const router = Router();

router.get('/', getMovies);

router.get('/:idMovie', getMovieDetails)

router.post('/',[
    JWTValidation,
    // check('image', 'Debes introducir una imagen.').not().isEmpty(),
    check('title', 'Debes introducir un titulo.').not().isEmpty(),
    check('score', 'Debes darle una calificación.').not().isEmpty(),
    check('score').custom(scoreValidator),
    check('genre').custom(genreValidator),
    validateForm
], postMovie)

router.put('/:idMovie', [
    JWTValidation,
    check('score', 'La calificación debe ser un número entre el 1 y el 5.').isNumeric().optional(),
    validateForm
], updateMovie)

router.delete('/:idMovie', [
    JWTValidation
], deleteMovie)

router.post('/:idMovie/characters/:idChar', addCharacter);

module.exports = router;