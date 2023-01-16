export interface CollectionMethods<T> {
  create(entite: T): Promise<boolean>

  readAll(): Promise<T[]>

  readOne(id: string | number): Promise<T | null>

  updateOne(id: string | number, entite: T): Promise<boolean>

  delete(id: string | number): Promise<boolean>
}