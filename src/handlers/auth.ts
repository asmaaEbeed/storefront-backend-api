import express, { Request, Response } from 'express'
import { authMiddleware } from '../middleware/auth'
import { authenticate } from '../services/auth'

const authService = new authenticate()

const create = async (req: Request, res: Response) => {
  try {
    const userData = await authService.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email
    })
    res.json(userData)
  } catch (e) {
    console.error(e)
    res.status(404).send('Failed to create an account')
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const params = req.body as {
      email: string
      password: string
    }

    const userInfo = await authService.login({
      email: params.email,
      password: params.password
    })

    res.json(userInfo)
  } catch (e) {
    console.error(e)
    res.status(404).send('Failed to login')
  }
}
const auth_routes = (app: express.Application) => {
  app.post('/register', authMiddleware, create)
  app.post('/login', authMiddleware, login)
}

export default auth_routes
