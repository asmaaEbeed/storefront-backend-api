
import Client from "../database";

export type Product = {
    id?: string;
    name: string;
    price: string;
}


export class ProductStore {
    async index(): Promise<Product[]> {
        const conn = await Client.connect()
        try {
            const sql = 'SELECT * FROM products'

            const result = await conn.query(sql)

            return result.rows


        } catch(err){
            throw new Error(`Unable get products: ${err}`)
        }
        finally {
            conn.release()
        }
    }

    async create(product: Product): Promise<Product> {
        const conn = await Client.connect();
        try {
          // @ts-ignore
          const sql = `INSERT INTO products (name, price) VALUES($1, $2) RETURNING *`;
      
      
          const result = await conn.query(sql, [product.name, product.price]);
          const newProduct = result.rows[0];
      
          
          return newProduct;
        } catch (err) {
            throw new Error(`unable create product (${product.name}): ${err}`);
        } finally {
            conn.release();
    
        }
      }

      async showProduct(id: string): Promise<Product> {
        const connection = await Client.connect();
        try {
            const result = await connection.query('SELECT * FROM products WHERE id = $1', [id]);
            if(result.rowCount === 0) throw new Error(`Product ${id} is not found`);
            return result.rows[0];
        } catch (err) {
          throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
        finally {
            connection.release();
        }
    }

    async update(id: string, product: Partial<Product>): Promise<Product>  {
        const connection = await Client.connect();
        try {
            const result = await connection.query<Product>("UPDATE products SET name = $1, price = $2 WHERE id=$3 RETURNING *", [product.name, product.price, product.id]);
    
            if(result.rowCount === 0) throw(`Product ${id} not found.`)
            return result.rows[0];
        }
     finally {
        connection.release();
    }
    }
    
    
    async remove(id: string) : Promise<void> {
        const connection = await Client.connect();
        try {
            const result = connection.query("DELETE FROM products WHERE id = $1", [id]);
            return;
        } finally{
            connection.release()
        }
    }
    
}