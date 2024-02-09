import type { Request, Response, NextFunction } from 'express'
import { URLSearchParams } from 'node:url'
import { callbackReq, loginReq } from '@/routes/validations'
import { getTempAuthCode, setTempAuthCode } from '@/state'
import { HttpError } from '@/utils/error'

const spotifyTokenURL = 'https://accounts.spotify.com/api/token'
const spotifyAuthorizationURL = 'https://accounts.spotify.com/authorize'
const { spotifyClientID, spotifyClientSecret, spotifyRedirectURI } = process.env

export const callback = async (req: Request & callbackReq, res: Response, next: NextFunction) => {
  try {
    if (!spotifyClientID || !spotifyClientSecret || !spotifyRedirectURI)
      throw new HttpError('Spotify credentials are not defined', 500)

    const { state, code } = req.query

    const tempAuthCode = getTempAuthCode()

    if (state !== tempAuthCode) throw new HttpError('Invalid state', 401)

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

export const login = (req: Request & loginReq, res: Response, next: NextFunction) => {
  try {
    const { scopes } = req.query

    const tempAuthCode = setTempAuthCode()

    if (!tempAuthCode) throw new HttpError('Temporary authorization code is not defined', 500)

    if (!spotifyClientID || !spotifyRedirectURI)
      throw new HttpError('Spotify credentials are not defined', 500)

    const authorizationParams = new URLSearchParams({
      response_type: 'code',
      client_id: spotifyClientID,
      scope: scopes.join(' '),
      redirect_uri: spotifyRedirectURI,
      state: tempAuthCode
    })

    res.redirect(spotifyAuthorizationURL + '?' + authorizationParams.toString())
  } catch (error) {
    next(error)
  }
}
