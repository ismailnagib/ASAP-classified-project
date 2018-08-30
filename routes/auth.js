const Routes = require('express').Router()
const User = require('../controllers/userController')

Routes.get('/', (req, res) => {res.render('login', {message: req.query.message})})
Routes.post('/', (req, res) => {User.login(req, res)})
Routes.get('/register', (req, res) => {res.render('register')})
Routes.post('/register', (req, res) => {User.register(req, res)})
Routes.get('/dashboard', (req, res) => {User.checkLogin(req, res)})

Routes.get('/:error', (req, res) => (res.render('error'))) // Selalu taruh paling bawah

module.exports = Routes