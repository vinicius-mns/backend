import { IhttpResponse } from '../../interfaces/UseCasesInterface'

export class StatusCode {

  static created<T>( content:T ) {
    return { statusCode: 201, content }
  }

  static create<T>(statusCode: number, content:T): IhttpResponse<T> {
    return { statusCode, content }
  }
}