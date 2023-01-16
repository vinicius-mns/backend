import { MongoClient, ObjectId, OptionalId } from 'mongodb'
import dotev from 'dotenv'

dotev.config()

const uri = `mongodb+srv://vinicius:${process.env.PASS}@cluster0.2vla7ld.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri)
