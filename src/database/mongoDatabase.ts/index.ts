import { MongoClient } from 'mongodb'
import dotev from 'dotenv'

dotev.config()

const uri = `mongodb+srv://vinicius:${process.env.PASS}@cluster0.2vla7ld.mongodb.net/?retryWrites=true&w=majority`
const database = new MongoClient(uri).db('portifolio')

export default class MongoDatabase<T> implements CollectionMethods<T> {
  private _collection

  constructor(private _collectionName: string, private _database = database) {
    this._collection = this._database.collection(this._collectionName)
  }

  async create(entite: T): Promise<boolean> {
    const data = await this._collection.insertOne(entite as unknown as OptionalId<Document>)
    if(data.acknowledged === true) { return true }
    return false
  }

  async readAll(): Promise<T[]> {
    const data = await this._collection.find({}).toArray() as unknown as T[]
    return data
  }

  async readOne(id: string | number): Promise<T | null> {
    const data = await this._collection.findOne({_id: new ObjectId(id)}) as T | null
    return data
  }

}
