export class CustomError {
  constructor(public message: string, public callback: () => void, public critical: boolean) {}
}
