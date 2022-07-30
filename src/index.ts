import express, { json, Application, Request, Response, urlencoded } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import order_routes from './handlers/orders'
import product_routes from './handlers/products'
import user_routes from './handlers/users'
import auth_routes from './handlers/auth'
import { authenticate } from './services/auth'

const authenticateModel = new authenticate()
dotenv.config()

const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()
app.use(urlencoded())
// HTTP request logger middleware

app.use(morgan('short'))
// app.use(order_routes);

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

order_routes(app)
product_routes(app)
user_routes(app)
auth_routes(app)

app.use(express.json())

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World!'
  })
})

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})


export default app