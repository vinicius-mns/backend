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
  }

  public object(obj: unknown) {
    return {
      isObject: (key?: string) => this._isOject(obj, key),
    }
  }

}