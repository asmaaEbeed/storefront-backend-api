# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 




## API Endpoints
### Products
- Index 
![get all Products](./apis-postman/Products-getallproducts.jpg)
- Show (args: product id)
![show product](./apis-postman/Products-show-product.jpg)
- Create (args: Product)[token required]
![create product](./apis-postman/Product-post-authorized.jpg)

- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)


### Users
- Index [token required]
![get all users](./apis-postman/Users-getallusers-authorized.jpg)

- Show (args: id)[token required]
![Show user data](./apis-postman/Users-getallusers-authorized.jpg)

- Create (args: User)[token required]
![Create new user](./apis-postman/Users-create-newuser.jpg)




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



