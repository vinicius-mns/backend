interface SafeParse {
  validationSafeParse: (key:string, type: string | number, typeName?: string) => string | undefined
}

interface ObjectLinter {
  [index: string ]: string | number
}

interface SchemaOBJ {
  [index: string ]: SafeParse
}

export class Primitive {

  private static valitadeWithMessage(typeName: string, key: string, type: unknown) {
    if(typeof type !== typeName){
      return `A chave: "${key}" esperava "${typeName}" mas recebeu: "${typeof type}"`
    }
  }

  static number(): SafeParse {
    return {
      validationSafeParse: (key:string, type: string | number, typeName='number') => this.valitadeWithMessage(typeName, key, type)
    }
  }

  static string(): SafeParse {
    return {
      validationSafeParse: (key:string, type: string | number, typeName='string') => this.valitadeWithMessage(typeName, key, type)
    }
  }

  private static _verifyAllKeys(schemaObj: SchemaOBJ, contentObj: ObjectLinter) {
    const ArrSchema = Object.keys(schemaObj)
    const ArrContent = Object.keys(contentObj)
    
    const err: { message: string | undefined, error: boolean } = { message: undefined, error: false }

    if( ArrSchema.length > ArrContent.length ){
      for ( const key of ArrSchema ) {
        if(!contentObj[key]) {
          err.message = `Está faltando a chave "${key}"`
          err.error = true
        }
      }
    }

    if( ArrContent.length > ArrSchema.length ) {
      for ( const key of ArrContent ) {
        if(!schemaObj[key]) {
          err.message = `A chave: "${key}" nao existe`
          err.error = true
        }
      }
    }
    
    return err
  }

  private static _verifyTypes(a: object, objValues: ObjectLinter) {
    const err: { message: string | undefined, error: boolean } = { message: undefined, error: false }

    const objRoles = Object.entries(a) as unknown as [ x:string, y: SafeParse ][]

    for ( const [key, parseFunction] of objRoles ) {
      const values = objValues[key]
      const errMsg = parseFunction.validationSafeParse(key, values)

      if(errMsg) {
        err.error = true
        err.message = errMsg
      }
    }

    return err
  }

  private static _safaParser (obj: SchemaOBJ, objx: ObjectLinter) {
    const verifyKey = this._verifyAllKeys(obj, objx)
    if(verifyKey.error) return verifyKey.message
    
    const verifyType = this._verifyTypes(obj, objx)
    if(verifyType.error) return verifyType.message
  }

  static object(obj: SchemaOBJ) {
    return {
      safaParser: (objx: ObjectLinter) => this._safaParser(obj, objx)
    }
  }
}
