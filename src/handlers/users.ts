import express, { Request, Response } from 'express'
import { authMiddleware } from '../middleware/auth'
import { User, makeUserModel } from '../models/users'

const userStore = new makeUserModel()

const index = async (_req: Request, res: Response) => {
  try {
    const users = await userStore.index()
    res.json(users)
  } catch (err) {
    res.json(err)
  }
}

const show = async (_req: Request, res: Response) => {
  try {
    const user = await userStore.showUser(_req.params.id)
    res.json(user)
  } catch (err) {
    res.json(err)
  }
}

const edit = async (req: Request, res: Response) => {
  try {
    const user: Omit<User, 'id'> = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email
    }
    const editedUser = await userStore.update(req.params.id, user)
    res.json(editedUser)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await userStore.remove(req.body.id)
    res.json(deleted)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const user_routes = (app: express.Application) => {
  app.get('/users', authMiddleware, index)
  app.get('/user/:id', authMiddleware, show)
  app.put('/user/:id', authMiddleware, edit)
  app.delete('/user', authMiddleware, destroy)
}

export default user_routes
