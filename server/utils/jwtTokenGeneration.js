import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();

export const getJWTwebToken=(_id,username)=>{
    return jwt.sign({_id,username},process.env.JWT_Security,{expiresIn:"50min"});
}