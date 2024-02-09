import { ErrorRequestHandler } from 'express'

export const ErrorHandler: ErrorRequestHandler = async (error, _, res, next) => {
  if (error) {
    if (!error.publicError) console.error(error)

    res
      .status(error.statusCode || 500)
      .json({ error: error.publicError ? error.message : 'SERVER ERROR' })
    return
  }
  next()
}
