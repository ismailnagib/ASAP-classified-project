const express = require('express')
const app = express()
const session = require('express-session')

const Auth = require('./routes/auth')
const orderRouter = require('./routes/order')
const Admin = require('./routes/admin')
const Courier = require('./routes/courier')

app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/css', express.static('public/css'))
app.use('/img', express.static('public/img'))

app.use(session({
    secret: "a secret",
    resave: false,
    saveUninitialized: true,
}))

app.get('/', (req, res) => {res.redirect('/auth')})
app.use('/auth', Auth)
app.use('/order' , orderRouter)
app.use('/admin', Admin)
app.use('/courier', Courier)

app.listen(3000, () => console.log('Running on port 3000'))
