import Product from "../Model/Product.js";

export const createProducts = async (req,res) => 
{
    const { name, description, price, stock } = req.body;
    if (!name || !description || !price || !stock) {
        return res.status(400).json({message: "Bad request!"});
    }
    const product = await Product.create({
        name,
        description,
        price,
        stock
    });
    if (!product) {
        return res.status(404).json({message: "Internal Server Error!"});
    }
    return res.status(200).json({data : product});
}

export const getProducts = async (req,res) => 
{
    const products = await Product.find();
    return res.status(200).json({data : products});
}

export const getProductById = async (req,res) =>
{
    const productId  = req.params.id;
    if(!productId)
    {
        return res.status(404).json({message : "Product id is required!"});  
    } 
    const product = await Product.findById(productId);
    if(!product)
    {
        return res.status(404).json({message : "Product Not Found!"});  
    } 
    return res.status(200).json({data : product});
}