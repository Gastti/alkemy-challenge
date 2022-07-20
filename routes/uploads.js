const { Router } = require('express');
const { check } = require('express-validator');
const { getCharacterImage, getMovieImage, getGenreImage } = require('../controllers/uploads.controllers');

const router = Router();

router.get('/characters/:id', getCharacterImage)
router.get('/movies/:id', getMovieImage)
router.get('/genres/:id', getGenreImage)

module.exports = router;