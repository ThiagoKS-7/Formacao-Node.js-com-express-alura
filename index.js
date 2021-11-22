const customExpress = require('./config/customExpress')
const conexao = require('./infrastructure/database/connection')
const Tabelas = require('./infrastructure/database/tabelas')

conexao.connect(erro => {
    if(erro) {
        console.log(erro);
    } else {
        Tabelas.init(conexao)
        console.log('Conectado ao banco!')
        const app = customExpress()

        app.listen(3000, console.log('Server running on port 3000.'))
    }
})





