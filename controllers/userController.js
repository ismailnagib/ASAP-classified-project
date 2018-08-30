const User = require('../models').User
const Encryption = require('./encryption')

class UserController {

    static login(req, res) {
        User.findOne({where: {email: req.body.email, password: Encryption.passwordGenerator(req.body.password)}})
        .then(datum => {
            if(datum) {
                req.session.user = {
                    name: datum.dataValues.name
                }
                if (datum.dataValues.role === "client") {
                    res.redirect('/auth/dashboard')
                }
            }
        })
        .catch(err => {
            res.redirect('/auth?message=Incorrect email address or password')
        })
    }

    static register(req, res) {
        if(req.body.password !== req.body.passwordCfm) {
            res.redirect('/auth/register?message=Passwords do not match')
        }
        let newUser = {
            name: req.body.name,
            password: req.body.password,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            role: "client",
            createdAt: new Date(),
            updatedAt: new Date()
        }
        User.create(newUser)
        .then(() => {
            req.session.user = {
                name: req.body.name
            }
            res.redirect('/auth/dashboard')
        })
        .catch(err => {
            res.redirect(`/auth/register?message=${err.message.slice(18)}`)
        })
    }

    static checkLoginAuth(req, res) {
        if (req.session.user) {
            res.redirect('/auth/dashboard')
        } else {
            res.render('login', {message: req.query.message})
        }
    }

    static checkLoginDashboard(req, res) {
        if (req.session.user) {
            res.render('dashboard', {name: req.session.user.name})
        } else {
            res.redirect('/auth')
        }
    }
}

module.exports = UserController