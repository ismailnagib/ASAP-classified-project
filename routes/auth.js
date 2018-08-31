const Routes = require('express').Router()
const User = require('../controllers/userController')

Routes.get('/', (req, res) => {User.checkLoginAuth(req, res)})
Routes.post('/', (req, res) => {User.login(req, res)})
Routes.get('/register', (req, res) => {res.render('register', {message: req.query.message})})
Routes.post('/register', (req, res) => {User.register(req, res)})
Routes.get('/logout', (req, res) => {User.logout(req, res)})

Routes.get('/:error', (req, res) => (res.render('error'))) // Selalu taruh paling bawah

module.exports = Routes