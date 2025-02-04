import { createProducts, getProductById, getProducts } from "../Controller/products.controller.js";
import { authenticateUser } from "../Middleware/auth.middleware.js";

export function productRoutes(app)
{
    app.post("/products", authenticateUser, createProducts);
    app.get("/products", authenticateUser, getProducts);
    app.get("/products/:id", authenticateUser, getProductById);
}