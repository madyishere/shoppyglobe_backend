import Cart from "../Model/Cart.js";
import Product from "../Model/Product.js";
import User from "../Model/User.js";

export const addToCart = async (req,res) => {
    try{

        const {userName} = req.user;
        if(!userName)
        {
            return res.status(403).json({message:"not authorized"});
        }
        const { productId, quantity } = req.body;
        if(!productId || !quantity)
        {
            return res.status(500).json({message : "invalid"});
        }
        const product = await Product.findById(productId);
        if(!product)
        {
            return res.status(404).json({message : "product not found!"});
        }

        if (quantity > product.stock) {
            return res.status(400).json({ message: "Requested quantity exceeds available stock!" });
        }
    
        const user = await User.findOne({userName});
        if(!user)
        {
            return res.status(404).json({message:"User Not Found!"});
        }
        
        // Check existing cart
        const cart = await Cart.findOne( { userId: user._id});
        if (!cart) {
            await Cart.create({
                userId : user._id,
                items: [
                    {
                        productId,
                        quantity
                    }
                ],
            })
        } else {
            cart.items.push({
                productId,
                quantity
            });
            await cart.save();
        }
        product.stock -= quantity;
        await product.save();
        return res.status(200).json({ 
            message: "Product added to cart successfully!",
            remainingStock: product.stock 
        });
    }
    catch(err)
    {
        throw Error(err);
    }
}

export const updateCart = async (req, res) => {
    try {
        const { userName } = req.user;
        if (!userName) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const productId = req.params.id;
        const { quantity } = req.body; 
        
        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        // Find product 
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found!" });
        }

        //Find User
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ message: "User Not Found!" });
        }

        //Find cart
        const cart = await Cart.findOne({ userId: user._id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not Found!" });
        }

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: "Item not found in cart!" });
        }

        // Calculate quantity difference and check stock
        const oldQuantity = cart.items[itemIndex].quantity;
        const quantityDifference = quantity - oldQuantity;

        if (quantityDifference > product.stock) {
            return res.status(400).json({ 
                message: "Requested quantity exceeds available stock!",
                availableStock: product.stock 
            });
        }

        // Update product stock
        product.stock -= quantityDifference;
        await product.save();

        // Update cart quantity
        cart.items[itemIndex].quantity = quantity;
        await cart.save();

        return res.status(200).json({ 
            message: "Cart updated successfully!", 
            cart,
            remainingStock: product.stock
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const deleteCart = async(req,res) => {
    try{
        const { userName } = req.user;
        if(!userName)
        {
            return res.status(403).json({message:"not authorized"});
        }
        const user = await User.findOne({userName});
        if(!user)
        {
            return res.status(404).json({message:"User Not Found"});
        }
    
        const { id: productId } =  req.params;
        if(!productId)
        {
            return res.status(404).json({message : "productId should is required!"});
        }
        const existingCart = await Cart.findOne({userId : user._id});
        if(!existingCart)
        {
            return res.status(404).json({message:"Cart Not Found"});
        }
        const itemIndex = existingCart.items.findIndex((item) => item.productId.toString() === productId);
        if (itemIndex !== -1) {
            const removedItem = existingCart.items[itemIndex];
            const product = await Product.findById(productId);
            if (product) {
                // Update product stock by adding back the cart quantity
                product.stock += removedItem.quantity;
                await product.save();
            }
            // existingCart.items = existingCart.items.splice(itemIndex, 1);
            existingCart.items.splice(itemIndex, 1);
            await existingCart.save();
            return res.status(200).json({message: "Product deleted"}); 
        }
        return res.status(404).json({message: "Item Not Found!"});
    }
    catch(err)
    {
        throw Error(err);
    }
}

