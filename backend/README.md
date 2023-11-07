# NestJS API Backend

## 1. Getting started

### 1.1 Requirements

Before starting, make sure you have at least those components on your workstation:

- An up-to-date release of [NodeJS](https://nodejs.org/), NPM and Yarn
- A database such as MariaDB, MySQL or PostgreSQL.

### 1.2 Project configuration

Start by cloning this project on your workstation.

```sh
git clone https://github.com/HaPin1/interview-theBradery.git
```

The next thing will be to install all the dependencies of the project.

```sh
cd ./backend
yarn install
```

Once the dependencies are installed, you can now configure your project by creating a new `.env` file containing your environment variables used for development.

```
cp .env.example .env
vi .env
```

### 1.3 Launch and discover

You are now ready to launch the NestJS application using the command below.

```sh
# Launch the development server with TSNode
yarn start:dev
```

## 2. Project structure

This template was made with a well-defined directory structure.

```sh
src/
project/
│
├── auth/
│ ├── auth.controller.ts # Controller for authentication endpoints
│ ├── auth.module.ts # Module for authentication, managing imports and authentication-related dependencies
│ ├── auth.service.ts # Service handling authentication business logic
│ ├── jwt-auth.guard.ts # Guard for protecting routes requiring JWT authentication
│ ├── jwt.strategy.ts # JWT strategy used by Passport for token validation
│ └── user.entity.ts # Representation of the "User" entity
│
├── cart/
│ ├── cart.controller.ts # Controller for cart operations
│ ├── cart.entity.ts # Entity representing the structure of basket data in database
│ ├── cart.module.ts # Module for basket-related operations
│ └── cart.service.ts # Service managing basket business logic
│
├── order/
│ ├── order.controller.ts # Endpoint controller for orders
│ ├── order.entity.ts # Entity representing order data structure in database
│ ├── order.module.ts # Module for order-related operations
│ └── order.service.ts # Service managing order business logic
│├── order/
│ ├── order.controller.ts # Endpoint controller for orders
│ ├── order.entity.ts # Entity representing order data structure in database
│ ├── order.module.ts # Module for order-related operations
│ └── order.service.ts # Service managing order business logic
│
├── product/
│ ├── products.controller.ts # Controller for product operations
│ ├── products.entity.ts # Entity representing product data structure in database
│ ├── products.module.ts # Module for product operations
│ └── products.service.ts # Service managing business logic for product-related operations
│
├── app.module.ts # Main application module, integrating all other modules
├── main.ts # Main entry point for starting the application
├── .env # Configuration file for environment variables
├── package.json # Node.js configuration file, listing dependencies and scripts to run the application
└── tsconfig.json # TypeScript configuration file
```

## 3. Setting up the Database

To set up the database, execute the provided SQL file located in the "src" directory.

## 4. Default Yarn commands

The Yarn commands below are already included with this template and can be used to quickly run, build and test your project.

```sh
# Start the application using the transpiled NodeJS
yarn start

# Run the application using "ts-node"
yarn start:dev

# Transpile the TypeScript files
yarn build

# Lint the project files using TSLint
yarn lint

```

## 5. Endpoints

### Authentication

/auth/login: Endpoint for logging in and obtaining a JWT token.
/auth/register : Endpoint to register a new user.

### Cart

/cart/add-to-cart : Endpoint to add a product to the cart.
/cart/remove-from-cart : Endpoint to remove a product from the cart.
/cart: Endpoint to retrieve the contents of a user's cart.
/cart/buy : Endpoint to buy products from the cart.

### Orders

/orders: Endpoint to retrieve the list of orders.
Products

### Products

/products : Endpoint to retrieve all products.
/products/:id : Endpoint to retrieve a specific product by ID.
