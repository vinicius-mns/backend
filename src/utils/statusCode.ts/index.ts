export class StatusCode {

  static created<T>( content:T ) {
    return { statusCode: 201, content }
  }

  static ok<T>( content:T ) {
    return { statusCode: 200, content }
  }

  static badRequest<T>( content:T ) {
    return { statusCode: 400, content }
  }

  static unauthorized<T> ( content: T ) {
    return { StatusCode: 401, content }
  }
}