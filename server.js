import mongoose, { Mongoose } from "mongoose";
import express from 'express';
import { cartRoutes } from "./Routes/cart.routes.js";
import { productRoutes } from "./Routes/products.routes.js";
import { userRoutes } from "./Routes/user.routes.js";

const app = express();
app.use(express.json());

app.listen(3000, ()=>{
    console.log("server is Running!");
})

mongoose.connect("mongodb://127.0.0.1:27017/shoppyGlobe");

const db = mongoose.connection;

db.on("open", ()=>{
    console.log("connection successfull");
})

db.on("error", ()=>{
    console.log("db -> something went wrong");
})

cartRoutes(app);
productRoutes(app);
userRoutes(app);



