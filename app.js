const express = require('express')
const app = express()
const Routes = require('./routes')

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', Routes);

app.listen(3000)