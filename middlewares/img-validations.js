const validateImage = (req, res, next) => {

    if (!req.files || !req.files.img || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            msg: 'La imagen es obligatoria.'
        });
    }

    next();
}

module.exports = {
    validateImage
}