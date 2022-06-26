const { uploadNewFile } = require("../helpers/upload-file");

const uploadFile = async (req, res) => {

    if (!req.files || !req.files.file || Object.keys(req.files).length === 0) {
        res.status(400).json({ msg: 'No hay archivos para subir.' });
        return;
    }

    try {

        const name = await uploadNewFile(req.files, ['png', 'jpg', 'jpeg', 'gif'], 'images');
        res.json({ name })

    } catch (err) {
        res.status(400).json({ err })
    }

}

const updateFile = async (req, res) => {

    const { dir, id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({
            msg: 'No es un ID válido.'
        })
    }


    res.json({ dir, id })
}

module.exports = {
    uploadFile,
    updateFile
}