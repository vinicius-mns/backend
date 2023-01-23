export class Primitive {

  private static valitadeWithMessage(typeName: string, key: string, type: unknown) {
    if(typeof type !== typeName){
      return `A chave: "${key}" esperava "string" mas recebeu: "${typeof type}"`
    }
  }

  static string() {
    return {
      validate: (key:string, type: string, typeName='string') => this.valitadeWithMessage(typeName, key, type)
    }
  }
}
