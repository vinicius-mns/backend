interface MsgError { 
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


  public object(obj: unknown) {
    return {
      isObject: (key?: string) => this._isOject(obj, key),
      notHasEmptyValues: () => this._notHasEmptyValues(obj as object),
      haveKey: (key: string) => this._haveKey(obj as object, key),
    }
  }

}