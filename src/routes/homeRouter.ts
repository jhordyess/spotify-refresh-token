import express, { Request, Response, Router } from 'express'

const homeRouter: Router = express.Router()

const userScopes: string[] = [
  'user-read-private',
  'user-read-email',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-top-read',
  'user-library-read',
  'user-library-modify',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-modify-private',
  'user-follow-read',
  'user-follow-modify'
]

homeRouter.get('/', (_: Request, res: Response) => {
  try {
    res.render('home', { scopes: userScopes })
  } catch (error) {
    console.error('Error:', error)
    res.render('500', { error: { message: 'Error, check the console.' } })
  }
})

export default homeRouter
