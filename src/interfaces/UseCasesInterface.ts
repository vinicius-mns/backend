export interface IhttpResponse<T> {
  statusCode: number
  content: T
}

export interface IUseCases<T> {
  create(entite: T): Promise<IhttpResponse<boolean>>

  readAll(): Promise<IhttpResponse<T[]>>

  readOne(id: string | number): Promise<IhttpResponse<T | null>>

  updateOne(id: string | number, entite: T): Promise<IhttpResponse<boolean>>

  delete(id: string | number): Promise<IhttpResponse<boolean>>
}