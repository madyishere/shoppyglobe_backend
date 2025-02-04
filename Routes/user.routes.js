import { userLogin, userRegister } from "../Controller/user.controller.js";


export function userRoutes(app)
{
    app.post("/login", userLogin);
    app.post("/register", userRegister);
}