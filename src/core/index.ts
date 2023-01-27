import { MyRouters } from '../constumer/express/Routes'
import MongoDatabase from '../database/mongoDatabase'
import { UseCasesCRUDE } from '../UseCases/CRUDE'

interface Props {
  nameDbCollection: string
  path: string
}

export class Seeder<T> {
  constructor(private props: Props,
    private _database = MongoDatabase<T>,
    private _useCases = UseCasesCRUDE<T>,
    private _consumer = MyRouters<T>,
  ) {}

  private get _D() {
    return new this._database(this.props.nameDbCollection)
  }

  private get _U() {
    return new this._useCases(this._D)
  }

  private get _C() {
    return new this._consumer(this.props.path, this._U)
  }


  get route() {
    return this._C
  }
}
