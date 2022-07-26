import express, { Request, Response } from 'express'
import { authMiddleware } from '../middleware/auth'
import { Order, OrderStore } from '../models/order'
import { Router } from 'express'

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
  const orders = await store.index()
  res.json(orders)
}

// const bookModel_routes = (app: express.Application) => {

const show = async (_req: Request, res: Response) => {
  console.log(_req.params)
  const order = await store.showOrder(_req.params.id)
  res.json(order)
}

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.userId
    }

    const newOrder = await store.create(order)
    res.json(newOrder)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id
  const productId: string = _req.body.productId
  const quantity: number = parseInt(_req.body.quantity)

  try {
    const addedProduct = await store.addOrderProduct(quantity, orderId, productId)
    res.json(addedProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.remove(req.body.id)
    res.json(deleted)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const order_routes = (app: express.Application) => {
  app.get('/orders', authMiddleware, index)
  app.get('/order/:id', authMiddleware, show)
  app.post('/order', authMiddleware, create)
  app.post('/order/:id/products', authMiddleware, addProduct)
  app.delete('/order', authMiddleware, destroy);
}

export default order_routes
