/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from 'vitest'
import { UseCasesCRUDE } from '.'
import { ICollectionMethods } from '../../interfaces/DataBaseInterfaces'

class mockSuccessDb<T> implements ICollectionMethods<T> {

  create(entite: T): Promise<boolean> {
    return new Promise((resolve,) => resolve(true))
  }

  readAll(): Promise<T[]> {
    return new Promise((resolve,) => resolve([
      {name: 'v'} as unknown as T,
      {name: 'v'} as unknown as T,
    ]))
  }
  readOne(id: string | number): Promise<T | null> {
    const list = [
      {id: '1', name: 'v'},
      {id: '2', name: 't'},
      {id: '3', name: 'm'},
    ]

    for(const obj of list) {
      if(obj.id === id){
        return new Promise((resolve,) => resolve(obj as unknown as T))
      }
    }
    return new Promise((resolve,) => resolve(null))
  }
  updateOne(id: string | number, entite: T): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  delete(id: string | number): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}

class mockFailureDb<T> implements ICollectionMethods<T> {

  create(entite: T): Promise<boolean> {
    return new Promise((resolve,) => resolve(false))
  }

  readAll(): Promise<T[]> {
    throw new Error('Method not implemented.')
  }
  readOne(id: string | number): Promise<T | null> {
    throw new Error('Method not implemented.')
  }
  updateOne(id: string | number, entite: T): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  delete(id: string | number): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}

describe('UseCases Crude', () => {
  it('Cria com sucesso', async () => {
    const success = new UseCasesCRUDE<{name: string}>(new mockSuccessDb())
    const createSuccess = await success.create({name: 'fulano'})

    expect(createSuccess.statusCode).toBe(201)
    expect(createSuccess.content).toEqual(true)
  })

  it('Erro ao criar', async () => {
    const error = new UseCasesCRUDE<{name: string}>(new mockFailureDb())
    const createFailure = await error.create({name: 'fulano'})

    expect(createFailure.statusCode).toBe(401)
    expect(createFailure.content).toEqual(false)
  })

  it('Retorna todos com sucesso', async () => {
    const success = new UseCasesCRUDE<{name: string}>(new mockSuccessDb())
    const readAllSuccess = await success.readAll()
  
    expect(readAllSuccess.statusCode).toBe(200)
    expect(readAllSuccess.content).toEqual([{name: 'v'}, {name: 'v'}])
  })

  it('Procura com id com sucesso', async () => {
    const success = new UseCasesCRUDE<{name: string}>(new mockSuccessDb())
    const readOneSuccess = await success.readOne('2')
    const readOneSuccessEmpty = await success.readOne('123')
  
    expect(readOneSuccess.statusCode).toBe(200)
    expect(readOneSuccess.content).contain({name: 't'})
    expect(readOneSuccess.content).contain({id: '2'})
    expect(readOneSuccessEmpty.content).toBe(null)
  })
})