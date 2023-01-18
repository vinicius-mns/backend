/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from 'vitest'
import MongoDatabase from '.'
import { IDataBase } from '../../interfaces/DataBaseInterfaces'

interface Schema {
  name: string
}

class MockDatabase<T> implements IDataBase<T>{

  constructor(private _db: T[] = []) {}
  
  private _insertOne(entite: T): Promise<{acknowledged: boolean}> {
    this._db.push(entite)
    return new Promise((resolve) => resolve({acknowledged: true}))
  }

  private _find(obj: unknown): {toArray(): Promise<T[]>} {
    return {
      toArray: () => new Promise((resolve) => resolve(this._db))
    }
  }

  private _findOne(obj: {id: string}): Promise<T | null> {
    return new Promise(() => ({name: 'vinicius'}))
  }

  private _updateOne(obj: {id: string},  set: {$set: T}): Promise<{acknowledged: boolean}> {
    return new Promise(() => ({acknowledged: true}))
  }

  private _deleteOne(obj: {id: string}): Promise<{acknowledged: boolean}> {
    return new Promise(() => ({acknowledged: true}))
  }

  collection(name: string) {
    return {
      insertOne: (entite: T) => this._insertOne(entite),
      find: (obj: unknown) => this._find(obj),
      findOne: (obj: {id: string}) => this._findOne(obj),
      updateOne: (obj: {id: string},  set: {$set: T}) => this._updateOne(obj, set),
      deleteOne: (obj: {id: string}) => this._deleteOne(obj)
    }
  }
}

describe('Databese', async () => {
  const Database = new MongoDatabase<Schema>('vinicius', new MockDatabase())

  it('É possivel cria uma nova entidade no banco dados', async() => {
    const create = await Database.create({name: 'viniciusApenas'})

    expect(create).toBe(true)
  })

  it('É possivel ler todas as entidades', async() => {
    await Database.create({name: 'vinicius'})

    const findAll = await Database.readAll()
    const entite = findAll[findAll.length - 1]
    
    expect(entite).toHaveProperty('id')
    expect(entite).toHaveProperty('name')
    expect(entite.name).toEqual('vinicius')
  })
})