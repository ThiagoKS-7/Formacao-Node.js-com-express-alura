class Tabelas {
    init(conexao) {
        this.conexao = conexao
        console.log('Tabelas foram chamadas!')
        this.criarAtendimentos()
        this.criarPets()
    }

    criarAtendimentos() {

        const sql = "CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT," +
        "cliente varchar(11) NOT NULL, pet varchar(20)," +
        " servico varchar(20) NOT NULL,status varchar(20) NOT NULL," +
        "dataCriacao datetime not null, dataAtendimento datetime not null," +
        "  observacoes text,PRIMARY KEY (id))"

        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela atendimento criada com sucesso!')
            }
        })
         
    }

    criarPets() {
        const sql = "CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT," +
        "nome varchar(50), imagem varchar(200), PRIMARY KEY (id))"

        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela pets criada com sucesso!')
            }
        })
    }
}

module.exports = new Tabelas