import * as express from 'express'
import type { Request, Response } from 'express'
import fetch from 'node-fetch'
import { stringify } from 'querystring'
import { generateRandomString } from './utils'

const app = express()
const port = process.env.PORT || 3000

app.get('/', (_, res: Response) => {
  res.send(
    'Hello World!, please go to /login to start the process. 🚀. Use the query with the key \'scope\', for example: /login?scope="user-read-currently-playing"'
  )
})

const spotifyAuthURL = 'https://accounts.spotify.com/authorize'
const spotifyTokenURL = 'https://accounts.spotify.com/api/token'

const clientID: string = process.env.SPOTIFY_CLIENT_ID || ''
const clientSecret: string = process.env.SPOTIFY_CLIENT_SECRET || ''
const redirectURI: string = process.env.SPOTIFY_REDIRECT_URI || ''

let state: string = ''

app.get('/login', function (req: Request, res: Response) {
  state = generateRandomString(16)

  const scope: string = (req.query.scope as string) || ''

  if (!clientID || !scope) {
    res.send('client_id or scope is not defined') //FIXME add more info 🤔
    return
  }

  res.redirect(
    spotifyAuthURL +
      '?' +
      stringify({
        response_type: 'code',
        client_id: clientID,
        scope,
        redirect_uri: redirectURI,
        state
      })
  )
})

app.get('/callback', async (req: Request, res: Response) => {
  const code: string = (req.query.code as string) || ''
  const stateQuery: string = (req.query.code as string) || ''

  if (!stateQuery || !code) {
    res.send('state or code is not defined')
    return
  }

  if (stateQuery !== state) {
    res.send('state is not equal')
    return
  }

  state = ''

  if (!clientID || !clientSecret) {
    res.send('client_id or client_secret is not defined')
    return
  }

  try {
    const headers = {
      Authorization: `Basic ${Buffer.from(`${clientID}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const body = new URLSearchParams({
      code,
      redirect_uri: redirectURI,
      grant_type: 'authorization_code'
    })

    const response = await fetch(spotifyTokenURL, {
      method: 'POST',
      headers,
      body
    })

    if (!response.ok) {
      throw new Error('Fetch error' + JSON.stringify(response))
    }

    const json = await response.json()
    console.info('json', json)
    res.send('The token was generated successfully, check the console. Now you can close this tab.')
  } catch (error) {
    console.error('error', error)
    res.send('Error on generate token, check the console.')
  }
})

app.listen(port, () => {
  console.log(`Running the app on port ${port}`)
})
