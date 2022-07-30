import supertest from "supertest";
import app from "../../index";
import { OrderStore, Order } from "../../models/order";
import { authenticate } from "../../services/auth";

const authenticateService = new authenticate();
const orderStore = new OrderStore();

const request = supertest(app);
let user: { id: number; token: string };
let order: Order;

describe("Order Route Test Suite", () => {
  beforeAll(async () => {
    user = await authenticateService.create({
      firstName: "name1",
      lastName: "name2",
      password: "pass",
      email: "testRotes@test.com",
    });

    order = await orderStore.create({
        status: "active",
        user_id: String(user.id)
      });
  });


  it("Gets a order by id", async () => {
    const res = await request
      .get(`/order/${order.id}`)
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(order.id);
    expect(res.body.status).toBe(order.status);
  });

});
