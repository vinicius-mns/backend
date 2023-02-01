export class Schema {

  static string() {
    return {
      validate: (arg: string | unknown) => {if(typeof arg !== 'string') return 'nao é string'}
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