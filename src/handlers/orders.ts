import express, { Request, Response } from 'express'
import { authMiddleware } from '../middleware/auth'
import { Order, OrderStore } from '../models/order'

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
  try{

    const orders = await store.index()
    res.json(orders)
  } catch(err){
    res.status(500)
    res.json(err)
  }
}

// const bookModel_routes = (app: express.Application) => {

const show = async (_req: Request, res: Response) => {
  try {

    const order = await store.showOrder(_req.params.id)
    res.json(order)
  } catch (err){
    res.status(400)
    res.json(err)
  }
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

const active = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const order = await store.getActiveOrder(userId);
    res.json(order);
  } catch (err) {
    res.status(500);
    res.json(err)
  }
};

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
  app.get('/order/users/:id', authMiddleware, active)
  app.post('/order/:id/products', authMiddleware, addProduct)
  app.delete('/order', authMiddleware, destroy);
}

export default order_routes
