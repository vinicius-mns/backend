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
