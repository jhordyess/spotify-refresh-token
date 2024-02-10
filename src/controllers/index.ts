import type { Request, Response, NextFunction } from 'express'
import { URLSearchParams } from 'node:url'
import { callbackReq, loginReq } from '@/routes/validations'
import { checkAuthCode, getAuthCode } from '@/utils/state'
import { HttpError } from '@/utils/error'
import { userScopes as scopes } from '@/utils/userScopes'

const spotifyTokenURL = 'https://accounts.spotify.com/api/token'
const spotifyAuthorizationURL = 'https://accounts.spotify.com/authorize'
const spotifyClientID = process.env.SPOTIFY_CLIENT_ID
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET
const spotifyRedirectURI = process.env.SPOTIFY_REDIRECT_URI

export const home = (_: Request, res: Response, next: NextFunction) => {
  try {
    res.render('home', { scopes })
  } catch (error) {
    next(error)
  }
}

export const login = (req: Request & loginReq, res: Response, next: NextFunction) => {
  try {
    const { scopes } = req.query

    const authCode = getAuthCode()

    if (!authCode) throw new HttpError('Temporary authorization code is not defined', 500)

    if (!spotifyClientID || !spotifyRedirectURI)
      throw new HttpError('Spotify credentials are not defined', 500)

    const authorizationParams = new URLSearchParams({
      response_type: 'code',
      client_id: spotifyClientID,
      scope: scopes,
      redirect_uri: spotifyRedirectURI,
      state: authCode
    })

    res.redirect(spotifyAuthorizationURL + '?' + authorizationParams.toString())
  } catch (error) {
    next(error)
  }
}

export const callback = async (req: Request & callbackReq, res: Response, next: NextFunction) => {
  try {
    if (!spotifyClientID || !spotifyClientSecret || !spotifyRedirectURI)
      throw new HttpError('Spotify credentials are not defined', 500)

    const { state, code } = req.query

    const isValid = checkAuthCode(state)

    if (!isValid) throw new HttpError('Invalid state', 401)

    const headers = new Headers({
      Authorization: `Basic ${Buffer.from(`${spotifyClientID}:${spotifyClientSecret}`).toString(
        'base64'
      )}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    })

    const body = new URLSearchParams({
      code,
      redirect_uri: spotifyRedirectURI,
      grant_type: 'authorization_code'
    })

    const tokenResponse = await fetch(spotifyTokenURL, {
      method: 'POST',
      headers,
      body
    })

    if (!tokenResponse.ok) throw new HttpError('Fetch error' + JSON.stringify(tokenResponse))

    const data = await tokenResponse.json()

    res.render('callback', { data })
  } catch (error) {
    next(error)
  }
}
