# Udacity: Build A Storefront Backend

This is a backend API build in Nodejs for an online store. It exposes a RESTful API that will be used by the frontend developer on the frontend.

The database schema and and API route information can be found in the [REQUIREMENT.md](REQUIREMENTS.md)

## Installation Instructions

This section contains all the packages used in this project and how to install them. However, you can fork this repo and run the following command at the root directory to install all packages.

`yarn` or `npm install`

### Packages

Here are some of the few packages that were installed.

#### express

`npm i -S express`
`npm i -D @types/express`

#### typescript

`npm i -D typescript`

#### db-migrate

`npm install -g db-migrate`

#### g

`npm install -g n`

#### rimraf

`npm install --save rimraf`

#### cors

`npm install --save cors`

#### bcrypt

`npm -i bcrypt`
`npm -i -D @types/bcrypt`


#### jsonwebtoken

`npm install jsonwebtoken --sav`
`npm -i -D @types/jsonwebtoken`

#### cross-env

`npm install --save-dev cross-env`

#### jasmine

`npm install jasmine @types/jasmine @ert78gb/jasmine-ts ts-node --save-dev`

#### supertest

`npm i supertest`
`npm i --save-dev @types/supertest`

## Set up Database

### Create Databases

We shall create the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user
  - `CREATE USER shopping_user WITH PASSWORD 'password123';`
- In psql run the following to create the dev and test database
  - `CREATE DATABASE shopping;`
  - `CREATE DATABASE shopping_test;`
- Connect to the databases and grant all privileges
  - Grant for dev database
    - `\c shopping`
    - `GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;`
  - Grant for test database
    - `\c shopping_test`
    - `GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;`

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

### Migrate Database

Navigate to the root directory and run the command below to migrate the database

`npm install -g db-migrate`
`npm add db-migrate db-migrate-pg`

`db-migrate create user_table --sql-file`

Create user table in `migrations/sqls/user_table_up`
Drop user table in `migrations/sqls/user_table_down`

run `db-migrate up`

`db-migrate create product_table --sql-file`

Create product table in `migrations/sqls/product_table_up`
Drop product table in `migrations/sqls/product_table_down`

run `db-migrate up`

`db-migrate create order_table --sql-file`

Create order table in `migrations/sqls/order_table_up`
Drop order table in `migrations/sqls/order_table_down`

run `db-migrate up`

There are many-to-many relationship between orders and products we will create seperate table for relationship.

`db-migrate create order_products_table --sql-file`

Create order-products table in `migrations/sqls/order-products_table_up`
Drop order-products table in `migrations/sqls/order-products_table_down`

run `db-migrate up`

## Enviromental Variables Set up

Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you.

**NB:** The given values are used in developement and testing but not in production.

```bash
# .env

PORT=3000

POSTGRES_DB = shopping
POSTGRES_TEST_DB = shopping_test
POSTGRES_HOST = localhost
POSTGRES_USER = shopping_user
POSTGRES_PASSWORD= password123
BCRYPT_PASSWORD=my-name-is-enow-2021
SALT_ROUNDS=10
TOKEN_SECRET=secret-token
ENV = dev
```

## Start App

`npm run start`

!['start server'](./docs/start.png)

### Running Ports

After start up, the server will start on port `3000` and the database on port `5432`

## Endpoint Access

All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file.

## Token and Authentication

Tokens are passed along with the http header as

```
Authorization   Bearer <token>
```

## Testing

Run test with

`npm run test`

It sets the environment to `test`, migrates up tables for the test database, run the test then migrate down all the tables for the test database.

### Environment Variables

Environment variables are set in the `.env` file and added in `.gitignore` so that it won't be added to github. However, I had provided the names of the variables that need to be set above. I also provided the values that were used in development and testing.

### Changing Enviroment to testing

I had set up two databases, one for development and the other for testing. During testing, I had to make sure the testing database is used instead of the developement database.

To acheive this, I set up a variable in the `.env` file which is by default set to `dev`. During testing, the command `yarn test` will set this variable to `test` in the package.json. Using `set` according using windows and finally drop database after testing.
 Here is the complete command.
`set ENV=test&& db-migrate --env test up && jasmine && db-migrate --env test reset&& db:drop test`


The first command change environment to test mode and using set for windows then migrates all tables, then the jasmine is run and then after testing, the database is reset, drop database after testing.
