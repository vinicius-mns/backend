import { IhttpResponse } from '../../interfaces/UseCasesInterface'

export class StatusCode {

  static create<T>(statusCode: number, content:T): IhttpResponse<T> {
    return { statusCode, content }
  }
}