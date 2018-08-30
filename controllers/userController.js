const User = require('../models').User

class UserController {

    static passwordGenerator(password) {
        const crypto = require('crypto');
        const hash = crypto.createHmac('sha256', 'the password is secure').update(password).digest('hex');
        return hash;
    }

    static checkLogin(req, res) {
        if (req.session) {
            res.render('dashboard', {message: req.query.message})
        }
    }

    static login(req, res) {
        console.log(UserController.passwordGenerator(req.body.password))
        User.findOne({where: {email: req.body.email, password: UserController.passwordGenerator(req.body.password)}})
        .then(datum => {
            if(datum) {
                req.session.user = {
                    name: datum.dataValues.name
                }
                res.redirect('/auth/dashboard')
            }
        })
        .catch(err => {
            res.redirect('/auth?message=Incorrect email address or password')
        })
    }

    static register(req, res) {
        let validPassword = "";
        if(req.body.password === req.body.passwordCfm) {
            validPassword = req.body.password;
        }
        let newUser = {
            name: req.body.name,
            password: UserController.passwordGenerator(validPassword),
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
            console.log(err)
            res.redirect('/auth/register')
        })
    }

    static checkLogin(req, res) {
        if (req.session) {
            res.render('dashboard')
        } else {
            res.redirect('/auth')
        }
    }
}

module.exports = UserController