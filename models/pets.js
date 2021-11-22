const conexao = require('../infrastructure/database/connection')
const fileUpload = require('../infrastructure/utils/fileUploader')
class Pet {
    adicionar(pet, res) {
        const sql = "INSERT INTO Pets SET ?"

        fileUpload(pet.imagem, pet.nome, (error, newPath) => {
            if(error) {
                res.status(400).json({error})
            } else {
                const newPet = {nome: pet.nome, imagem: newPath}
                conexao.query(sql, newPet, erro => {
                    if(erro) {
                        res.status(400).json(erro)
                    } else {
                        res.status(200).json(pet)
                    }
                })
        
            }
        }) 

        console.log(pet)


    }
}

module.exports = new Pet()