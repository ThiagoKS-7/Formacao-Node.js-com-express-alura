const fs = require('fs')
const path = require('path')

module.exports = (caminho, image, callback) => {
    const validTypes = ['jpg', 'png', 'jpeg']
    const type = path.extname(caminho)
    const isInvalid = validTypes.indexOf(type.substring(1)) === -1;

    if (isInvalid) {
        const error = 'Erro - Tipo de imagem inválida!'
        console.log(error);
        callback(error);
    } else {
        const newPath = `./assets/${image}${type}`

        fs.createReadStream(caminho)
        .pipe(fs.createWriteStream(newPath))
        .on('finish', () => callback(false, newPath))
    }
}