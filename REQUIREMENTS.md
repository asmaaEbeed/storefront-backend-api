# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 


### Database Schema

    -user schema

    ```sql
    CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    password VARCHAR(30),
    email VARCHAR(50) UNIQUE
    );
    ```

    - Product Schema

    ```sql
    CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    price VARCHAR(50)
    );
    ```

    - Order Schema

    ```sql
    CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(64) NOT NULL,
    user_id bigint REFERENCES users(id)
    );
    ```

    -Order Product Schema (Many-to-Many relationship)

    ```sql
    CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
    );
    ```


## API Endpoints
### Products
- Index `'/products [GET]`
![get all Products](./apis-postman/Products-getallproducts.jpg)

- Show (args: product id) `'/product/:id [GET]`
![show product](./apis-postman/Products-show-product.jpg)

- Create (args: Product)[token required] `'/product [POST]`
![create product](./apis-postman/Product-post-authorized.jpg)

- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)


### Users
- Index [token required] `'/orders[GET]`
![get all users](./apis-postman/Users-getallusers-authorized.jpg)

- Show [token required] : `'/order/:id [GET]`
![Show user data](./apis-postman/Users-getallusers-authorized.jpg)

- Create [token required] `'/order [POST]`
![Create new user](./apis-postman/Users-create-newuser.jpg)

- Login [token required] `'/login [POST]`
![Login](./apis-postman/Auth-post-login.jpg)

- Register [token required] `'/register [POST]`
![Login](./apis-postman/Auth-post-register.jpg)



### Orders endpoints
- Create [token required] : `'/order' [POST]`
Token is authorized
![create-order-authorized](./apis-postman/Order-post-authorized.jpg)
Token is unauthorized
![create-order-unauthorized](./apis-postman/Order-post-Unauthorized.jpg)

- Get all orders [token required]: `'/orders' [GET]`
![get all products](./apis-postman/Order-getAll.jpg)

- Delete product [token required]: `'/order' [DELETE]`
![Delete product](./apis-postman/Order-delete.jpg)

- Add product to order [token required]: `'/order/:id/products [POST]`
![Add product to order](./apis-postman/Ordered-Product-authorized.jpg)

- Active Order by user (args: user id) [token required] : `'orders/users/:userId/active' [GET]`
- Completed Orders by user (args: user id) [token required] `'orders/users/:userId/completed' [GET]`




## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

#### order_products
- id
- quantity
- order_id
- product_id


## Test

Screens from successfull test 
![Add product to order](./apis-postman/test1.png)

![Add product to order](./apis-postman/test2.jpg)





