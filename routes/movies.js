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
const { validateImage } = require('../middlewares/img-validations');
const { scoreValidator, genreValidator } = require('../helpers/custom-validations');

// Routes
const router = Router();

router.get('/', getMovies);

router.get('/:idMovie', getMovieDetails)

router.post('/',[
    JWTValidation,
    check('title', 'Debes introducir un titulo.').not().isEmpty(),
    check('score', 'Debes darle una calificación.').not().isEmpty(),
    check('score').custom(scoreValidator),
    // check('genre').custom(genreValidator),
    validateImage,
    validateForm
], postMovie)

router.put('/:idMovie', [
    JWTValidation,
    check('score').optional(),
    check('genre').optional(),
    check('score').custom(scoreValidator),
    check('genre').custom(genreValidator),
    validateForm
], updateMovie)

router.delete('/:idMovie', [
    JWTValidation
], deleteMovie)

router.post('/:idMovie/addcharacter/:idChar', [
    JWTValidation
], addCharacter);

module.exports = router;