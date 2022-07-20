const { Router } = require('express');
const { check } = require('express-validator');
const { getGenres, getGenreDetail, postGenre } = require('../controllers/genres.controllers');
const { validateForm } = require('../middlewares/form-validations');
const { validateImage } = require('../middlewares/img-validations');
const { JWTValidation } = require('../middlewares/jwt-validations');

const router = Router();

router.get('/', getGenres)
router.get('/:idGenre', getGenreDetail)

router.post('/', [
    JWTValidation,
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    validateImage,
    validateForm
], postGenre)

module.exports = router;