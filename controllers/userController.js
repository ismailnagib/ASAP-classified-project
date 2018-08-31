const User = require('../models').User
const Encryption = require('./encryption')

class UserController {

    static login(req, res) {
        if (req.body.email && req.body.password) {
            User.findOne({where: {email: req.body.email, password: Encryption.passwordGenerator(req.body.password)}})
            .then(datum => {
                if(datum) {
                    req.session.user = {
                        id: datum.dataValues.id,
                        name: datum.dataValues.name,
                        role: datum.dataValues.role
                    }
                    if (datum.dataValues.role === "client") {
                        res.redirect('/order')
                    } else {
                        res.redirect('/admin')
                    }
                }
            })
            .catch(err => {
                res.redirect('/auth?message=Incorrect email address or password')
            })
        } else {
            res.redirect('/auth?message=You must input your registered email and password to log in')
        }
    }

    static register(req, res) {
        if (req.body.name && req.body.email && req.body.password && req.body.passwordCfm && req.body.phone && req.body.address) {
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
                    id: req.body.id,
                    name: req.body.name,
                    role: "client"
                }
                res.redirect('/order')
            })
            .catch(err => {
                res.redirect(`/auth/register?message=${err.message.slice(18)}`)
            })
        } else {
            res.redirect('/auth/register?message=You must fill every field to sign up')
        }
    }

    static checkLoginAuth(req, res) {
        if (req.session.user) {
            res.redirect('/order')
        } else {
            res.render('login', {message: req.query.message})
        }
    }

    static checkLoginAdmin(req, res) {
        if (req.session.user && req.session.user.role === "admin") {
            res.render('admin');
        } else {
            res.redirect('/auth')
        }
    }

    static logout(req, res) {
        req.session.user = null;
        res.redirect('/auth');
    }
}

module.exports = UserController