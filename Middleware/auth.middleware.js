import jwt from "jsonwebtoken";


export const authenticateUser = (req,res,next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    jwt.verify(token, "tyfdft9783#$@%$usubfd873iw", (err,user) =>{
        if(err)
        {
            return res.status(403).json({message:"Unauthorized User!"});
        } else {
            req.user = user;
            next();
        }
    })
}

