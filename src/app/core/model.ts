export class Version {
  constructor(public majorVersion: number, public minorVersion: number) {}
}

export class Status<T> {
  constructor(public error: boolean, public value: T, public message: string, public version: number) {}
}

export class CustomError {
  constructor(public message: string, public callback: () => void, public critical: boolean) {}
}

export class ClientMessage {
  constructor(public service: string, public resource: string, public version: number, public timestamp: number, public payload: string) {}
}
