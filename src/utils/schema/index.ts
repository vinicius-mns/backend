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
      compare: (currentObj: object) => this._compare(schemaObj, currentObj)
    }
  }

  private static _validateSchemaObj(schemaObj: object){
    const validateSchemaObj = this._isObject(schemaObj, 'Define')
    if(validateSchemaObj) return validateSchemaObj

    const entries = Object.entries(schemaObj)

    for(const [key, value] of entries){
      if(typeof value === 'string') {
        return `Define - "${key}" nao pode receber o tipo: "string" como valor`
      }

      if(typeof value === 'number') {
        return `Define - "${key}" nao pode receber o tipo: "number" como valor`
      }
    }
  } 

  public static compare(schemaObj: object, currentObj: object) {

  }
}