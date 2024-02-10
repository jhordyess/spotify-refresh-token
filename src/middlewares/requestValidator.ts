import type { NextFunction, Request, RequestHandler, Response } from 'express'
import { validationResult, type ValidationChain } from 'express-validator'
import { HttpError } from '@/utils/error'

const checkRequest: RequestHandler = (req, _, next) => {
  try {
    const result = validationResult(req)

    if (!result.isEmpty()) {
      const messages = result.array().map(({ msg }) => msg)
      throw new HttpError(messages.join(', '), 400)
    }

    next()
  } catch (error) {
    next(error)
  }
}

export const withValidation = <R>(
  validation: ValidationChain | ValidationChain[],
  handler: (req: Request & R, res: Response, next: NextFunction) => void
) => [validation, checkRequest, handler]
