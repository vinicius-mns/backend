export interface IDataBase<T> {
  collection(name: string): {

    insertOne(entite: T): Promise<{acknowledged: boolean}>

    find(obj: unknown): {toArray(): Promise<T[]>}

    findOne(obj: {id: string}): Promise<T | null>

    updateOne(obj: {id: string},  set: {$set: T}): Promise<{acknowledged: boolean}>
    
    deleteOne(obj: {id: string}): Promise<{acknowledged: boolean}>
  }
}

export interface ICollectionMetods<T> {
  create(entite: T): Promise<boolean>

  readAll(): Promise<T[]>

  readOne(id: string | number): Promise<T | null>

  updateOne(id: string | number, entite: T): Promise<boolean>

  delete(id: string | number): Promise<boolean>
}