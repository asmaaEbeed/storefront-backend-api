import supertest from "supertest";
import app from "../../index";
import { ProductStore, Product } from "../../models/product";
import { authenticate } from "../../services/auth";

const authenticateService = new authenticate();
const productStore = new ProductStore();

const request = supertest(app);
let product: Product;

describe("Product Route Test Suite", () => {
  beforeAll(async () => {
    product = await productStore.create({
        name: "prod_test",
        price: "15"
      });
  });


  it("Gets a order by id", async () => {
    const res = await request
      .get(`/product/${product.id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(product.id);
    expect(res.body.name).toBe(product.name);
  });

});
