const axios = require("axios")
const moment = require("moment")

const conexao = require('../infrastructure/database/connection')
const repositorio = require('../repositories/atendimento')
class Atendimento {
    constructor() {
        this.dataValida = ({dataAtendimento, dataCriacao}) => { moment(dataAtendimento).isSameOrAfter(dataCriacao) }
        this.clientValido = (tamanho) => tamanho >= 5  
        
        this.validacoes = [
            {
               nome: 'data',
               valido: this.dataValida,
               mensagem: 'Data do agendamento deve ser maior ou igual à data atual.'
            },
            {
                nome: 'cliente',
                valido: this.clientValido,
                mensagem: 'Nome do cliente deve ter 5 ou mais caracteres.'
             }
        ]
        this.valida = (parametros) => {
            this.validacoes.filter(campo =>{
                const { nome } = campo
                const parametro = parametros[nome]
                return !campo.valido(parametro)
            })
        }
    }
    adiciona(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD')
        const dataAtendimento = moment(atendimento.dataAtendimento, 'DD/MM/YYYY').format('YYYY-MM-DD')  

        const parametros = {
            data: {dataAtendimento, dataCriacao},
            cliente: { tamanho: atendimento.cliente.length }
        }

        const erros = this.valida(parametros)
        if( erros ) {
            console.log(erros)
            return new Promise((resolve, reject) => reject(erros))
        }  else {

            const atendimentoDatado = {...atendimento, dataCriacao, dataAtendimento}
            
            return repositorio.adiciona(atendimentoDatado)
                .then(resultados => {
                    const id = resultados.insertId
                    return { ...atendimento, id}
                })
            }
    }

    lista() {
        return repositorio.lista() 
    }

    buscaPorId(id) {
        return repositorio.buscaPorId(id)
    }

    alterar(id, valores, res) {
        if(valores.dataAtendimento) {
            valores.dataAtendimento = moment(valores.dataAtendimento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = `UPDATE Atendimentos SET ? Where id=${id}`

        conexao.query(sql, valores, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id,resultados})
            }
        })
    }

    deletar(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?'
        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id, resultados})
            }
        })
    }
       
}

module.exports = new Atendimento



