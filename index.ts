import express from 'express'
import dotev from 'dotenv'

dotev.config()

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', function (_req, res) {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`)
})