const express = require('express')
const { Address } = require('../models') // to pegando o model do index
const router = express.Router()

const OK = 200
const ErrorServer = 500

const error = (e, res) => {
  console.log(e.message)
  return res.status(ErrorServer).json({message: 'Erro no servidor'})
}

router.get('/', async (_req, res) => {
  try {
    const address = await Address.findAll();

    return res.status(OK).json(address)
  } catch (e) {
    return error(e, res)
  }
})

module.exports = router