export class Version {
  constructor(public majorVersion: number, public minorVersion: number) {}
}

export class Status<T> {
  constructor(public error: boolean, public value: T, public message: string) {}
}

export class CustomError {
  constructor(public message: string, public callback: () => void, public critical: boolean) {}
}
