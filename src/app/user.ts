export class Users {
    constructor(
      public id: number, 
      public name: string,
      public password: string,
      public role: string, 
      public active: boolean
      ) { }
  }
  