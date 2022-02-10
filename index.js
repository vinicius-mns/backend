const express = require('express');
const userControllerEmployees = require('./controllers/employees')
const userControllerAddress = require('./controllers/addresses')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

app.use('/employees', userControllerEmployees)
app.use('/address', userControllerAddress)

// app.use('/addresses', userControllerAddresses)
app.get('/', (_req, res) => res.send(`<h1>porta: ${PORT}</h1>`))

app.listen(PORT, () => console.log(`ouvindo na porta ${PORT}`))