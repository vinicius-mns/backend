const express = require('express')
const { Employee, Address } = require('../models') // to pegando o model do index
const router = express.Router()

const OK = 200
const ErrorServer = 500

const error = (e, res) => {
  console.log(e.message)
  return res.status(ErrorServer).json({message: 'Erro no servidor'})
}

router.get('/', async (_req, res) => {
  try {
    const employees = await Employee.findAll({
      include: { model: Address, as: 'addresses' },
      limit: 2
    });

    return res.status(OK).json(employees)
  } catch (e) {
    return error(e, res)
  }
})

module.exports = router