import { Router } from 'express'
import { callbackCheck, loginCheck } from '@/routes/validations'
import { callback, home, login } from '@/controllers'
import { withValidation } from '@/middlewares/requestValidator'

const router = Router()

router.get('/', home)

router.get('/login', ...withValidation(loginCheck, login))

router.get('/callback', ...withValidation(callbackCheck, callback))

export default router
