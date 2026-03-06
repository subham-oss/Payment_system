import User from "../models/user.model";
import jwt from "jsonwebtoken";

export const userRegisterController = async (req, res) => {
    const { name, email, password } = req.body;
    
    const isexisting = await User.findOne({
        email:email
    })
    if(isexisting){
        return res.status(422).json({
            message:"User already exists",
            success:false
        });
    }
    const token = jwt.sign({userId:User._id},process.env.SECRET_KEY,{expiresIn:"2d"});
}