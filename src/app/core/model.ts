export class Status<T> {
  constructor(public error: boolean, public value: T, public message: string, public version: number, public critical: boolean) {}
}

export class CustomError {
  constructor(public message: string, public callback: () => void) {}
}

export class ClientMessage {
  constructor(public service: string, public resource: string, public version: number, public timestamp: number, public payload: string) {}
}

export class Login {
  constructor(public username: string, public password: string) {}
}
