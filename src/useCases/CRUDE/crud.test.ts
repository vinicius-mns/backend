/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from 'vitest'
import { UseCasesCRUDE } from '.'
import { ICollectionMethods } from '../../interfaces/DataBaseInterfaces'

const list = [
  {id: '1', name: 'v'},
  {id: '2', name: 't'},
  {id: '3', name: 'm'},
]

class mockSuccessDb<T> implements ICollectionMethods<T> {

  private _list = list

  create(entite: T): Promise<boolean> {
    return new Promise((resolve,) => resolve(true))
  }

  readAll(): Promise<T[]> {
    return new Promise((resolve,) => resolve(this._list as unknown as T[]))
  }

  readOne(id: string | number): Promise<T | null> {
    for(const obj of this._list) {
      if(obj.id === id){
        return new Promise((resolve,) => resolve(obj as unknown as T))
      }
    }
    return new Promise((resolve,) => resolve(null))
  }

  updateOne(id: string | number, entite: T): Promise<boolean> {
    for(const obj of this._list) {
      if(obj.id === id){
        this._list.splice(
          this._list.indexOf(obj),
          1,
          {id ,...entite} as unknown as {id: string, name: string}
        )
        return new Promise((resolve) => resolve(true))
      }
    }
    return new Promise((resolve,) => resolve(false))
  }
  
  delete(id: string | number): Promise<boolean> {
    for(const obj of this._list) {
      if(obj.id === id){
        this._list.splice( this._list.indexOf(obj), 1 )
        return new Promise((resolve) => resolve(true))
      }
    }
    return new Promise((resolve,) => resolve(false))
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
  it('Cria entidade com sucesso', async () => {
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

  it('Retorna todas entidades com sucesso', async () => {
    const success = new UseCasesCRUDE<{name: string}>(new mockSuccessDb())
    const readAllSuccess = await success.readAll()
  
    expect(readAllSuccess.statusCode).toBe(200)
    expect(readAllSuccess.content.length).toBe(3)
    expect(readAllSuccess.content[0]).contain(list[0])
  })

  it('Procura entidade por id com sucesso', async () => {
    const success = new UseCasesCRUDE<{name: string}>(new mockSuccessDb())
    const readOneSuccess = await success.readOne('2')
    const readOneSuccessEmpty = await success.readOne('123')
  
    expect(readOneSuccess.statusCode).toBe(200)
    expect(readOneSuccess.content).contain({name: 't'})
    expect(readOneSuccess.content).contain({id: '2'})
    expect(readOneSuccessEmpty.content).toBe(null)
  })

  it('Atualiza entidade com sucesso', async () => {
    const success = new UseCasesCRUDE<{name: string}>(new mockSuccessDb())

    const findOne = await success.readOne('1')
    expect(findOne.content).contain({name: 'v'})        

    const updatedSuccess = await success.updateOne('1', {name: 'abc'})
    expect(updatedSuccess.statusCode).toBe(200)
    expect(updatedSuccess.content).toBe(true)
    
    const updated = await success.readOne('1')
    expect(updated.statusCode).toBe(200)
    expect(updated.content).contain({name: 'abc'})

    const updatedNoIdFound = await success.updateOne('9999', {name: 'new name'})
    expect(updatedNoIdFound.statusCode).toBe(200)
    expect(updatedNoIdFound.content).toBe(false)
  })

  it('Deleta entidade com sucesso', async () => {
    const success = new UseCasesCRUDE<{name: string}>(new mockSuccessDb())

    const deletedSucess = await success.delete('1')
    expect(deletedSucess.statusCode).toBe(200)
    expect(deletedSucess.content).toBe(true)

    const deleteEmptyId = await success.delete('999')
    expect(deleteEmptyId.content).toBe(false)

    const findOne = await success.readOne('1')
    expect(findOne.statusCode).toBe(200)
    expect(findOne.content).toBe(null)
  })
})