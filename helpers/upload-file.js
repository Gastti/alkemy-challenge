const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadNewFile = (files, validExtension, folder = '') => {

    return new Promise((resolve, reject) => {

        const { img } = files;
        const cutName = img.name.split('.');
        const extension = cutName[cutName.length - 1];

        if (!validExtension.includes(extension)) {
            return reject(`La extensión ${extension} no está permitida. Extensiones permitidas: ${validExtension}`)
        }

        const tempName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

        img.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            resolve(tempName)
        });

    })

}

module.exports = {
    uploadNewFile
}