import express, { Request, Response } from 'express'

const spotifyTokenURL = 'https://accounts.spotify.com/api/token'
const spotifyClientID: string = process.env.SPOTIFY_CLIENT_ID || ''
const spotifyClientSecret: string = process.env.SPOTIFY_CLIENT_SECRET || ''
const spotifyRedirectURI: string = process.env.SPOTIFY_REDIRECT_URI || ''

import { getTempAuthCode } from '../state'

const callbackRouter = express.Router()

callbackRouter.get('/', async (request: Request, response: Response) => {
  const authCode: string = (request.query.code as string) || ''
  const state: string = (request.query.state as string) || ''

  if (!state || !authCode) {
    response.render('500', { error: { message: 'state or code is not defined' } })
    return
  }

  if (state !== getTempAuthCode()) {
    response.render('500', { error: { message: 'state is not equal' } })
    return
  }

  if (!spotifyClientID || !spotifyClientSecret) {
    response.render('500', { error: { message: 'Client ID or client secret is not defined' } })
    return
  }

  try {
    const headers = new Headers({
      Authorization: `Basic ${Buffer.from(`${spotifyClientID}:${spotifyClientSecret}`).toString(
        'base64'
      )}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    })

    const body = new URLSearchParams({
      code: authCode,
      redirect_uri: spotifyRedirectURI,
      grant_type: 'authorization_code'
    })

    const tokenResponse = await fetch(spotifyTokenURL, {
      method: 'POST',
      headers,
      body
    })

    if (!tokenResponse.ok) {
      throw new Error('Fetch error' + JSON.stringify(tokenResponse))
    }

    const tokenData = await tokenResponse.json()
    response.render('callback', { data: tokenData })
  } catch (error) {
    console.error('error', error)
    response.render('500', { error: { message: 'Error on generate token, check the console.' } })
  }
})

export default callbackRouter
