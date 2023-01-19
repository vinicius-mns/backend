import { Router } from 'express'
import { IUseCases } from '../../../interfaces/UseCasesInterface'

export class MyRouters<T> {
  constructor(private _path: string, private _useCase: IUseCases<T>, private _router = Router()){}
  
  private _create() {
    return this._router.post(`/${this._path}/create`, async(req, res) => {
      const body = req.body
      const data = await this._useCase.create(body)
      return res.status(data.statusCode).json(data.content)
    })
  }
  
  private _readAll() {
    return this._router.get(`/${this._path}/all`, async(_req, res) => {
      const data = await this._useCase.readAll()
      return res.status(data.statusCode).json(data.content)
    })
  }

  private _readOne() {
    return this._router.get(`/${this._path}/find/:id`, async(req, res) => {
      const { id } = req.params
      const data = await this._useCase.readOne(id)
      return res.status(data.statusCode).json(data.content)
    })
  }

  private _update() {
    return this._router.put(`/${this._path}/update/:id`, async(req, res) => {
      const { id } = req.params
      const body = req.body
      const data = await this._useCase.updateOne(id, body)
      return res.status(data.statusCode).json(data.content)
    })
  }

  private _delete() {
    return this._router.delete(`/${this._path}/update/:id`, async(req, res) => {
      const { id } = req.params
      const data = await this._useCase.delete(id)
      return res.status(data.statusCode).json(data.content)
    })
  }
  
  get routers() {
    this._create()
    this._readAll()
    this._readOne()
    this._update()
    this._delete()
    return this._router
  }
}