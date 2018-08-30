const Routes = require('express').Router()
const User = require('../controllers/userController')

Routes.get('/', (req, res) => {User.checkLoginAdmin(req, res)})

Routes.get('/:error', (req, res) => {res.render('error')})

module.exports = Routes