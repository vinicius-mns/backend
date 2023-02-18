export interface MsgError { 
  [key: string] : string
}

export class Helper {
  public Errors: MsgError[] = []

  private _isOject(obj: object | unknown, key?: string) {
    if(typeof obj !== 'object' || obj === null ){
      this.Errors.push({ObjectError: `${key || obj} deve ser do tipo "object"`})
    }

    return this.object(obj)
  }

  private _notHasEmptyValues(obj: object) {
    const entries = Object.entries(obj)
    
    for( const [ key, value ] of entries) {
      if(!value) {
        this.Errors.push({ValueError: `${key} nao pode receber valor Nulo ou Vazio`})
      }
    }

    return this.object(obj)
  }

  private _haveKey(obj: object, key: string) {
    if( !(key in obj) ){
      this.Errors.push({PropsError: `O objeto ${JSON.stringify(obj)} esperava receber chave "${key}"`})
    }

    return this.object(obj)
  }

  private _isNotEmptyObject(obj: object, key?: string) {
    if( Object.keys(obj).length < 1 ) {
      this.Errors.push({ObjectError: `${JSON.stringify(key || obj)} - Não pode ser um objeto vazio`})
    }

    return this.object(obj)
  }

  private _haveAnyOfTheseKeys(obj: object, keys: string[], key: string) {

    if(!(keys.includes(Object.keys(obj)[0]))){
      this.Errors.push({PropsError: `${key} precisa reveber um obj com uma das seguintes propriedades: [${keys}]`})
    }
    
    return this.object(obj)
  }

  private _entries(obj: object) {
    return Object.entries(obj)
  }


  public object(obj: unknown) {
    return {
      isObject: (key?: string) => this._isOject(obj, key),
      notHasEmptyValues: () => this._notHasEmptyValues(obj as object),
      haveKey: (key: string) => this._haveKey(obj as object, key),
      isNotEmptyObject: (key?: string) => this._isNotEmptyObject(obj as object, key),
      haveAnyOfTheseKeys: (keys: string[], key: string) => this._haveAnyOfTheseKeys(obj as object, keys, key),
      return: {
        entries: () => this._entries(obj as object)
      }
    }
  }

  public throwError(error: string, typeError: string){
    if(error) {
      return this.Errors.push({typeError, error})
    }
  }

}