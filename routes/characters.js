// Imports
const { Router } = require('express');
const { check } = require('express-validator');

const {
    getCharacters,
    getCharacterDetails,
    updateCharacter,
    postCharacter,
    deleteCharacter,
    addNewMovie
} = require('../controllers/characters.controllers');

const { validateForm } = require('../middlewares/form-validations');
const { JWTValidation } = require('../middlewares/jwt-validations');
const { validateImage } = require('../middlewares/img-validations')

// Routes
const router = Router();

router.get('/', getCharacters);

router.get('/:idChar', getCharacterDetails);

router.post('/', [
    JWTValidation,
    check('name', 'Debes introducir un nombre.').not().isEmpty(),
    check('age', 'Debes introducir la edad.').not().isEmpty(),
    check('age', 'La edad debe ser un número.').isNumeric(),
    check('weight', 'Debes introducir el peso.').not().isEmpty(),
    check('weight', 'El peso debe ser un número.').isNumeric(),
    check('story', 'El personaje debe tener al menos una breve historia.').not().isEmpty(),
    validateImage,
    validateForm
], postCharacter);

router.put('/:idChar',[
    JWTValidation,
    check('name').optional(),
    check('age', 'La edad debe ser un número.').isNumeric().optional(),
    check('weight', 'El peso debe ser un número.').isNumeric().optional(),
    validateForm
], updateCharacter);

router.delete('/:idChar', [
    JWTValidation
], deleteCharacter)

router.post('/:idChar/addmovie/:movieId',[
    JWTValidation
], addNewMovie);

module.exports = router;