import mongoose from "mongoose";

//creating model
const cartSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    //items as an array containing multiple objects
    items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
          },
          quantity: {
            type: Number,
            required: true
          }
        }
    ],
})


export default mongoose.model("Cart", cartSchema);


