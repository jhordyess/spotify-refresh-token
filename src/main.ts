import express, { Request, Response } from 'express'
import { homeRouter, loginRouter, callbackRouter } from './routes'

const app = express()
const port = process.env.PORT || 3000

app.set('views', './src/views')
app.set('view engine', 'pug')

app.use('/', homeRouter)
app.use('/login', loginRouter)
app.use('/callback', callbackRouter)

app.use((_: Request, res: Response) => {
  res.status(404).render('404')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
