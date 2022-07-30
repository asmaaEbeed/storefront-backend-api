"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../../models/order");
var orderModel = new order_1.OrderStore();
var order;
var newUser;
describe('Order model', function () {
    // beforeAll(async () => {
    //   newUser = await userModel.create({
    //     firstName: 'first-test',
    //     lastName: 'lastTest',
    //     password: 'password123',
    //     email: 'email@test.com'
    //   })
    // })
    it('has a create method', function () {
        expect(orderModel.create).toBeDefined();
    });
    it('has a updateorder method', function () {
        expect(orderModel.updateOrder).toBeDefined();
    });
    //   it('create should add an order', async () => {
    //     const newOrder = {
    //         status: "active",
    //         user_id: "1"
    //     }
    //     const result = await orderModel.create(newOrder);
    //     expect(result.id).toEqual("1");
    //   });
});
