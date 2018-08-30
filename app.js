const express = require('express')
const app = express()
const Auth = require('./routes/auth')
const session = require('express-session')

app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: "a secret",
    resave: false,
    saveUninitialized: true,
}))

app.get('/', (req, res) => {res.redirect('/auth')})
app.use('/auth', Auth);

app.listen(3000)