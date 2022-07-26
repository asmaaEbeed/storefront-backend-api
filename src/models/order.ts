import Client from "../database";

export type Order = {
    id?: string;
    status: string;
    user_id: string;
}

export class OrderStore {

     async create(order: Order): Promise<Order> {
        const conn = await Client.connect();
        try {
          // @ts-ignore
          const sql = `INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *`;
      
      
          const result = await conn.query(sql, [order.status, order.user_id]);

          const newOrder = result.rows[0];
      
          
          return newOrder;
        } catch (err) {
            throw new Error(`unable create order (${order.status}): ${err}`);
        } finally {
            conn.release();
    
        }
      }

      async index() {
        const connection = await Client.connect();
        try {
            const result = await connection.query('SELECT * FROM orders');
            return result.rows;
        } catch (err) {
          throw new Error(`Could not get orders. Error: ${err}`)
        }
         finally {
            connection.release();
        }
    }

    async showOrder(id: string): Promise<Order> {
        const connection = await Client.connect();
        try {
            const result = await connection.query('SELECT * FROM orders WHERE id = $1', [id]);
            if(result.rowCount === 0) throw new Error(`Order ${id} is not found`);
            return result.rows[0];
        } catch (err) {
          throw new Error(`Could not find Order ${id}. Error: ${err}`)
        }
        finally {
            connection.release();
        }
    }


    async addOrderProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        const conn = await Client.connect()
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3)'

            const result = await conn.query(sql, [quantity, orderId, productId])

            const order = result.rows[0]

            return order


        } catch(err){
            throw new Error(`Unable add product: ${productId} to order ${orderId}: ${err}`)
        }
        finally {
            conn.release()
        }
    }

    async updateOrder(id: string, status: string): Promise<Order>  {
        const connection = await Client.connect();
        try {
            const result = await connection.query<Order>("UPDATE orders SET status=$2 WHERE id=$1 RETURNING *", [id, status]);
    
            if(result.rowCount === 0) throw(`order ${id} not found.`)
            return result.rows[0];
        }
     finally {
        connection.release();
    }
    }
    
    
    async remove(id: string) : Promise<void> {
        const connection = await Client.connect();
        try {
            const result = connection.query("DELETE FROM orders WHERE id = $1", [id]);
            return;
        } finally{
            connection.release()
        }
    }
}