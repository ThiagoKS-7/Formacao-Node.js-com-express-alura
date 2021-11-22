const Atendimento = require("../models/atendimentos")
const axios = require("axios")
module.exports = app => {

    app.get('/atendimentos', (req,res) => {
        Atendimento.lista()
            .then(resultados => res.status(200).json(resultados))
            .catch(erros => res.status(400).json(erros))
    })

    app.get('/atendimentos/:id', (req,res) => {
        const id = parseInt(req.params.id[1])
        console.log(id)
        Atendimento.buscaPorId(id)
            .then(async (results) => {
                const atendimento = results[0]
                const cpf = atendimento.cliente

                console.log(atendimento)
                console.log(cpf)
    
            const { data } = await axios.get(`http://localhost:8082/${cpf}`)
            atendimento.cliente = data
            console.log(atendimento.cliente)
            return atendimento
          })
            .then(atendimento => res.status(200).json(atendimento))
            .catch(erro => res.status(400).json(erro))
    })

    app.post('/atendimentos', (req,res) => {
        const atendimento = req.body
        res.send(atendimento)
        Atendimento.adiciona(atendimento)
            .then(atendimentoCadastrado => res.status(201).json(atendimentoCadastrado))
            .catch(erros => res.status(400).json(erros))
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id[1])
        const valores = req.body

        Atendimento.alterar(id, valores, res)
    })

    app.delete('/atendimentos/:id', (req,res) => {
        const id = parseInt(req.params.id[1])
        Atendimento.deletar(id, res)
    })

}