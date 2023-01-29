import { ICollectionMethods } from '../../interfaces/DataBaseInterfaces'
import { IUseCases } from '../../interfaces/UseCasesInterface'
import { StatusCode } from '../../utils/statusCode.ts'

export class UseCasesCRUDE<T> implements IUseCases<T> {
  constructor(private _database: ICollectionMethods<T>, private _status=StatusCode){}

  async create(entite: T) {
    const content = await this._database.create(entite)
    if(content === true) {
      return this._status.created(content)
    }
    return this._status.unauthorized(content)
  }

  async readAll() {
    const content = await this._database.readAll()
    return { statusCode: 200, content }
  }

  async readOne(id: string | number) {
    const content = await this._database.readOne(id)
    return { statusCode: 200, content }
  }

  async updateOne(id: string | number, entite: T) {
    const content = await this._database.updateOne(id, entite)
    return { statusCode: 200, content }
  }

  async delete(id: string | number) {
    const content = await this._database.delete(id)
    return { statusCode: 200, content }
  }
}