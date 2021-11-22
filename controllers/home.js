module.exports = app => {
    // O send da requisição GET é o que aparece no localhost:3000
    app.get('/', (req,res) => {
        res.send('Hello World')
    })
}