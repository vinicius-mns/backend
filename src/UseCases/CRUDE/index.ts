import { ICollectionMethods } from '../../interfaces/DataBaseInterfaces'
import { IUseCases } from '../../interfaces/UseCasesInterface'

export class UseCasesCRUDE<T> implements IUseCases<T> {
  constructor(private _database: ICollectionMethods<T>){}

  async create(entite: T) {
    const content = await this._database.create(entite)
    if(content === true) {
      return { statusCode: 201, content }
    }
    return { statusCode: 401, content }
  }

  async readAll() {
    const content = await this._database.readAll()
    return { statusCode: 200, content }
  }

  async readOne(id: string | number) {
    const content = await this._database.readOne(id)
    return { statusCode: 200, content }
  }
}