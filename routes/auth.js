const { Router } = require('express');
const { check } = require('express-validator');
const { Login, Register } = require('../controllers/users.controllers');
const { validateForm } = require('../middlewares/form-validations');
const { nicknameExists, emailExists} = require('../helpers/custom-validations.js')

const router = Router();

router.post('/register', [
    check('nickname', 'Debes introducir un nickname.').not().isEmpty(),
    // check('nickname').custom(nicknameExists),
    check('email', 'Debes introducir un email.').not().isEmpty(),
    // check('email').custom(emailExists),
    check('email', 'El email no es válido.').isEmail(),
    check('password', 'Debes introducir una contraseña.').not().isEmpty(),
    validateForm
], Register)

router.post('/login', [
    check('email', 'Debes introducir un email.').not().isEmpty(),
    check('email', 'El email no es válido.').isEmail(),
    check('password', 'Debes introducir una contraseña.').not().isEmpty(),
    validateForm
], Login)

module.exports = router;