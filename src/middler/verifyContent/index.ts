interface SafeParse {
  validationSafeParse: (key:string, type: string | number, typeName?: string) => string | undefined
}

interface ObjectLinter {
  [index: string ]: string | number
}

export class Primitive {

  private static valitadeWithMessage(typeName: string, key: string, type: unknown) {
    if(typeof type !== typeName){
      return `A chave: "${key}" esperava "${typeName}" mas recebeu: "${typeof type}"`
    }
  }

  static string() {
    return {
      validate: (key:string, type: string, typeName='string') => this.valitadeWithMessage(typeName, key, type)
    }
  }
}
