import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyIsLoggedIn = (req, res, next) => {
  const token = req.cookies?.access_token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    next(); 
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

