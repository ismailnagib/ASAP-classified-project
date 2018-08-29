const Routes = require('express').Router()

Routes.get('/', (req, res) => {res.render('index')})

Routes.get('/:error', (req, res) => (res.render('error'))) // Selalu taruh paling bawah

module.exports = Routes