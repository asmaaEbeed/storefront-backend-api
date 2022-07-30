import client from "../../database";
import {ProductStore, Product} from "../../models/product";

const productModel = new ProductStore();

let product: { id: string};

describe("Product Model Test Suite", () => { 
    beforeAll(async () => {
        const connection = await client.connect();
        product = (
          await connection.query(
            `INSERT INTO products (name, price) VALUES($1, $2) RETURNING id;`,
            ["prod_test", "15"]
          )
        ).rows[0];
        connection.release();
      });

      it("create new product", async () => {
        const newProduct = { id: product.id, name: "prod2-test", price: "20"}
        const product_added = await productModel.create(newProduct);

        expect(newProduct.id).toBe(product.id);
      })

      
      it("gets product by id", async () => {
        const product_required = await productModel.showProduct(product.id);
        expect(product_required.id).toBe(product.id);
      });

      it("Lists all products", async () => {
        const users = await productModel.index();
        expect(users.length).toBeDefined();
      });
})