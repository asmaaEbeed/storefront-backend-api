"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../../models/order");
var orderModel = new order_1.OrderStore();
var order;
var newUser;
describe('Order model', function () {
    it('has a create method', function () {
        expect(orderModel.create).toBeDefined();
    });
    it('has a updateorder method', function () {
        expect(orderModel.updateOrder).toBeDefined();
    });
});
