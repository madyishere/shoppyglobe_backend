import { addToCart, deleteCart, updateCart } from "../Controller/cart.controller.js";
import { authenticateUser } from "../Middleware/auth.middleware.js";

export function cartRoutes(app)
{
    app.post("/cart", authenticateUser ,addToCart);
    app.put("/cart/:id", authenticateUser ,updateCart);
    app.delete("/cart/:id", authenticateUser ,deleteCart);
}