const Courier = require('../models').Courier

class CourierController {

    static list(req, res) {
        if (req.session.user && req.session.user.role === "admin") {
            Courier.findAll({order: ['id']})
            .then(data => {
                res.render('courier', {data: data, message: req.query.message})
            })
            .catch(err => {
                res.redirect(`/courier?message=${err.message}`)
            })
        } else {
            res.redirect('/auth')
        }
    }

    static add(req, res) {
        let newCourier = {
            name: req.body.name,
            phone: req.body.phone,
            rating: 0,
            isAvailable: true,
            ratedBy: 0
        }
        if (req.body.name && req.body.phone) {
            Courier.create(newCourier)
            .then(() => {
                res.redirect('/courier')
            })
            .catch(err => {
                res.redirect(`/courier?message=${err.message}`)
            })
        } else {
            res.redirect(`/courier?message=You must fill every field to add a new courier`)
        }  
    }

    static editSet(req, res) {
        Courier.findById(req.params.id)
        .then(data => {
            res.render('courierEdit', {id: req.params.id, data: data})
        })
    }

    static edit(req, res) {
        let edited = {};
        if (req.body.name) {
            edited.name = req.body.name
        }
        if (req.body.phone) {
            edited.phone = req.body.phone
        }
        Courier.update(edited, {where: {id: req.params.id}})
        .then(() => {
            res.redirect('/courier')
        })
        .catch(err => {
            res.redirect(`/courier?message=${err.message}`)
        })
    }

    static fire(req, res) {
        Courier.destroy({where: {id: req.params.id}})
        .then(() => {
            res.redirect('/courier')
        })
        .catch(err => {
            res.redirect(`/courier?message=${err.message}`)
        })
    }
}

module.exports = CourierController