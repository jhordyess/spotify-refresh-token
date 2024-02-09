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
    scopes: Array<string>
  }
}

export const loginCheck = query('scopes')
  .notEmpty()
  .withMessage('Scopes is not defined')
  .isArray({
    min: 1
  })
  .withMessage('Scopes is not an valid array')
  .toArray()
//TODO add validate of string array and exists in 'userScopes'
