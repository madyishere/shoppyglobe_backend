# ShoppyGlobe API

## Project: Built APIs with Node.js and Express.js for ShoppyGlobe

### E-commerce

## Objective
The backend for the ShoppyGlobe application was created using Node.js, Express, and MongoDB.

---

## characteristics 

### 1. Node.js and Express API Setup
- A Node.js application was set up using Express.
- Routes were created for the following:
  - `GET /products` - Fetched a list of products from MongoDB.
  - `GET /products/:id` - Fetched details of a single product by its ID.
  - `POST /cart` - Added a product to the shopping cart.
  - `PUT /cart/:id` - Updated the quantity of a product in the cart.
  - `DELETE /cart/:id` - Removed a product from the cart.

### 2. MongoDB Integration
- MongoDB was used to store product data and cart items.
- Collections were set up for:
  - **Products**: Each product had fields like `name`, `price`, `description`, and `stock quantity`.
  - **Cart**: Stored items added to the cart, including `product IDs` and `quantities`.
- CRUD operations were implemented on MongoDB collections for products and cart items.

### 3. API Error Handling and Validation
- Error handling was implemented for all API routes.
- Input data was validated (e.g., checked if product ID existed before adding to cart).

### 4. Authentication & Authorization
- JWT-based authentication was implemented.
- Routes were created for User Registration and User Login:
  - `POST /register` - Registered a new user.
  - `POST /login` - Authenticated user and returned a JWT token.
- Cart routes were protected so only logged-in users could access them.

---
The application will run:
   ```sh
   npm start
   ```

## Technologies Used
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
