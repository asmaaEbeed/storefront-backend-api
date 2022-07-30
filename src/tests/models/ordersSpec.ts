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
  // beforeAll(async () => {
  //   newUser = await userModel.create({
  //     firstName: 'first-test',
  //     lastName: 'lastTest',
  //     password: 'password123',
  //     email: 'email@test.com'
  //   })
  // })

  it('has a create method', () => {
    expect(orderModel.create).toBeDefined()
  })

  it('has a updateorder method', () => {
    expect(orderModel.updateOrder).toBeDefined()
  })

  //   it('create should add an order', async () => {
  //     const newOrder = {
  //         status: "active",
  //         user_id: "1"
  //     }
  //     const result = await orderModel.create(newOrder);

  //     expect(result.id).toEqual("1");
  //   });
})
