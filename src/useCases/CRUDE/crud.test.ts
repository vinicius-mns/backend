/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from 'vitest'
import { UseCasesCRUDE } from '.'
import { ICollectionMethods } from '../../interfaces/DataBaseInterfaces'

class mockSuccessDb<T> implements ICollectionMethods<T> {

  create(entite: T): Promise<boolean> {
    return new Promise((resolve,) => resolve(true))
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
})