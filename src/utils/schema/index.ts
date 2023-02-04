interface PrimitiveValidation<T> {
  validate(arg: T, key: string): undefined | string
}
export class Schema {

  static string(): PrimitiveValidation<'string'> {
    return {
      validate: (arg: string, key: string)  => {
        if(typeof arg !== 'string') return `A key: "${key}" esperava o tipo "STRING" mas recebeu: ${typeof arg}`
      }
    }
  }

  public static define(schemaObj: object) {
    return {
      compare: (currentObj: object) => this.compare(schemaObj, currentObj)
    }
  }

  public static compare(schemaObj: object, currentObj: object) {

  }
}