import express from 'express'
import morgan from 'morgan'
import router from '@/routes'
import { errorHandler, notFoundHandler } from '@/middlewares/handlers'

const port = process.env.PORT || 3000
const app = express()

// Middleware
app.use(morgan('dev'))

// Pug template
app.set('views', './src/views')
app.set('view engine', 'pug')

// Routes
app.use('/', router)

// Error handler
app.use(errorHandler)

// Not found handler
app.use('*', notFoundHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
