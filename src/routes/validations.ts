import { userScopes } from '@/utils/userScopes'
import { query } from 'express-validator'

export type callbackReq = {
  query: {
    code: string
    state: string
  }
}

export const callbackCheck = [
  query('code')
    .notEmpty()
    .withMessage('code is not defined')
    .isString()
    .withMessage('code is not a string')
    .escape(),
  query('state')
    .notEmpty()
    .withMessage('state is not defined')
    .isString()
    .withMessage('state is not a string')
    .escape()
]

export type loginReq = {
  query: {
    scopes: string
  }
}

export const loginCheck = query('scopes')
  .notEmpty()
  .withMessage('Scopes is not defined')
  .custom(scopes => {
    if (Array.isArray(scopes)) {
      return scopes.every(scope => userScopes.includes(scope))
    } else if (typeof scopes === 'string') {
      return userScopes.includes(scopes)
    } else {
      throw new Error('Not valid')
    }
  })
  .withMessage('Scopes is not valid')
  .customSanitizer(scopes => {
    if (Array.isArray(scopes)) {
      return scopes.join(' ')
    } else if (typeof scopes === 'string') {
      return scopes
    } else {
      throw new Error("Can't sanitize scope")
    }
  })
  .isString()
  .withMessage('Scopes is not valid')
  .escape()
