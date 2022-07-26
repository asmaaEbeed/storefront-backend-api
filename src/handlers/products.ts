import express, { Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { Product, ProductStore } from "../models/product";
import { Router } from "express";

const store = new ProductStore();



const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (_req: Request, res: Response) => {
    console.log(_req.params)
  const product = await store.showProduct(_req.params.id);
  res.json(product);
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price
    };
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}

const destroy = async (req: Request, res: Response) => {
    try {
      const deleted = await store.remove(req.body.id);
      res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};


const product_routes = (app: express.Application) =>{
    app.get('/products', index);
    app.get('/product/:id', show);
    app.post('/product', create);
    app.delete('/product', destroy);
}

export default product_routes;
