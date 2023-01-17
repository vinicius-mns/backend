import { MongoClient } from 'mongodb'
import { ICollectionMethods, IDataBase } from '../../interfaces/DataBaseInterfaces'
import { v4 as uuidV4 } from 'uuid'
import dotev from 'dotenv'

dotev.config()

const uri = `mongodb+srv://vinicius:${process.env.PASS}@cluster0.2vla7ld.mongodb.net/?retryWrites=true&w=majority`
const database = new MongoClient(uri).db('portifolio')

export default class MongoDatabase<T> implements ICollectionMethods<T> {
  private _collection

  constructor(private _collectionName: string, private _database = database as unknown as IDataBase<T>) {
    this._collection = this._database.collection(this._collectionName)
  }

  private newId(): string {
    return uuidV4()
  }

  async create(entite: T): Promise<boolean> {
    const obj = { id: this.newId(), ...entite }
    const data = await this._collection.insertOne(obj)
    if(data.acknowledged === true) { return true }
    return false
  }

  async readAll(): Promise<T[]> {
    const data = await this._collection.find({}).toArray()
    return data
  }

  async readOne(id: string): Promise<T | null> {
    const data = await this._collection.findOne({ id }) as T | null
    return data
  }

  async updateOne(id: string, entite: T): Promise<boolean> {
    const data = await this._collection.updateOne({ id }, {$set: entite})
    if(data.acknowledged === true) { return true }
    return false
  }

  async delete(id: string): Promise<boolean> {
    const data = await this._collection.deleteOne({ id })
    if(data.acknowledged === true) { return true }
    return false
  }
}
