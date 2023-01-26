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

  static object(obj: SchemaOBJ) {
    return {
      validate: (key:string, type: string, typeName='string') => this.valitadeWithMessage(typeName, key, type)
    }
  }
}
