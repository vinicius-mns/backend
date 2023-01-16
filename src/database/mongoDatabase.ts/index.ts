import { MongoClient } from 'mongodb'
import dotev from 'dotenv'

dotev.config()

const uri = `mongodb+srv://vinicius:${process.env.PASS}@cluster0.2vla7ld.mongodb.net/?retryWrites=true&w=majority`
const database = new MongoClient(uri).db('portifolio')

export default class MongoDatabase {
  private _collection

  constructor(private _collectionName: string, private _database = database) {
    this._collection = this._database.collection(this._collectionName)
  }
}
