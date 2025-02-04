import jwt from "jsonwebtoken";
import User from "../Model/User.js";

export const userLogin =  async (req,res) => {
    const {userName, password} = req.body;
    const user = await User.findOne({userName,password})
    if(user)
    {
        const accessToken = jwt.sign({ userName: user.userName },"tyfdft9783#$@%$usubfd873iw");
        return res.status(200).json({token: accessToken});
    }
    return res.status(404).json({message: "User Not Found/Wrong Password!"});
}

export const userRegister = async (req,res) => {
    const {name, userName, password} = req.body;
    if(!name || !userName || !password)
    {
        return res.status(400).json({ message: "please provide all details!" });
    }
    const existingUser = await User.findOne({userName});
    if(existingUser)
    {
        return res.status(400).json({ message: "User already exists!" });
    }
    const newUser = new User({ name, userName, password});
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully!"});
}
