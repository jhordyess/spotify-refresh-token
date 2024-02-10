import { ErrorRequestHandler, RequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = async (error, _, res, next) => {
  if (error) {
    if (!error.publicError) console.error(error)

    res.render('500', { error: { message: error.publicError ? error.message : 'SERVER ERROR' } })
    return
  }
  next()
}

export const notFoundHandler: RequestHandler = (_, res) => {
  res.sendStatus(404).render('404')
}
