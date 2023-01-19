import express, { Router } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3002

export class MyExpress {

  constructor(private _express = express()){
    this._init()
  }

  private _init() {
    this._express.use(express.json())
    this._express.listen(PORT, () => {
      console.log(`http://localhost:${PORT}/`)
    })
  }

  use(r: Router[]) {
    r.map(router => {
      this._express.use(router)
    })
  }
}
