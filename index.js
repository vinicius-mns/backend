const express = require('express');
const userControllerEmployees = require('./controllers/employees')
const userControllerAddress = require('./controllers/addresses')
const bodyParser = require('body-parser')

const app = express();
const PORT = 3000

app.use(bodyParser.json())

app.use('/employees', userControllerEmployees)
app.use('/address', userControllerAddress)

// app.use('/addresses', userControllerAddresses)



app.listen(PORT, () => console.log(`ouvindo na porta ${PORT}`))