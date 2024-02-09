export class HttpError extends Error {
  statusCode: number
  publicError: boolean

  constructor(message = 'SERVER ERROR', statusCode = 500, publicError = true) {
    super(message)
    this.statusCode = statusCode
    this.publicError = publicError
  }
}
