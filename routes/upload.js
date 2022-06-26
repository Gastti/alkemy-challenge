const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile, updateFile } = require('../controllers/upload.controllers');

const router = Router();

router.post('/', uploadFile)

router.put('/:dir/:id',[], updateFile)

module.exports = router;