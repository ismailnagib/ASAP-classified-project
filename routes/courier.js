const Routes = require('express').Router()
const Courier = require('../controllers/courierController')

Routes.get('/', (req, res) => {Courier.list(req, res)})
Routes.post('/', (req, res) => {Courier.add(req, res)})
Routes.get('/:id/edit', (req, res) => {Courier.editSet(req, res)})
Routes.post('/:id/edit', (req, res) => {Courier.edit(req, res)})
Routes.get('/:id/fire', (req, res) => {Courier.fire(req, res)})

Routes.get('/:error', (req, res) => {res.render('error')})

module.exports = Routes