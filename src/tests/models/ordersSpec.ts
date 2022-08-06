import client from '../../database'
import { OrderStore, Order } from '../../models/order'

const orderModel = new OrderStore()
let order: { id: string }
type user = {
  firstName: []
  lastName: []
  password: []
  email: []
}
let newUser: user

describe('Order model', () => {

  it('has a create method', () => {
    expect(orderModel.create).toBeDefined()
  })

  it('has a updateorder method', () => {
    expect(orderModel.updateOrder).toBeDefined()
  })
})
