import express, { Request, Response } from 'express'
import { setTempAuthCode } from '../state'

const spotifyAuthorizationURL = 'https://accounts.spotify.com/authorize'
const spotifyClientID: string = process.env.SPOTIFY_CLIENT_ID || ''
const spotifyRedirectURI: string = process.env.SPOTIFY_REDIRECT_URI || ''

const loginRouter = express.Router()

loginRouter.get('/', (request: Request, response: Response) => {
  try {
    const tempAuthCode = setTempAuthCode() || ''
    const reqScopes = request.query.scopes

    if (!tempAuthCode || tempAuthCode === '') {
      response.render('500', { error: { message: 'Temporary authorization code is not defined' } })
      return
    }

    if (!spotifyClientID) {
      response.render('500', { error: { message: 'Spotify client ID is not defined' } })
      return
    }

    let scopesString: string = ''
    if (Array.isArray(reqScopes)) {
      scopesString = reqScopes.join(' ')
    } else if (typeof reqScopes === 'string' && reqScopes.length > 1) {
      scopesString = reqScopes
    }

    const authorizationParams = new URLSearchParams({
      response_type: 'code',
      client_id: spotifyClientID,
      scope: scopesString,
      redirect_uri: spotifyRedirectURI,
      state: tempAuthCode
    })
    response.redirect(spotifyAuthorizationURL + '?' + authorizationParams.toString())
  } catch (error) {
    console.error('Error:', error)
    response.render('500', { error: { message: 'Error, check the console.' } })
  }
})

export default loginRouter
