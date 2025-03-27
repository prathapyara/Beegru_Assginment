import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoDB } from "./config/db.js";
import apiRoutes from "./routes/apiRoutes.js"
import cookieParser from "cookie-parser";



MongoDB();
const app=express();
dotenv.config();

app.use(express.json());
app.use(cookieParser()); 
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, 
  })
);

app.get("/",(req,res)=>{
    res.send("hello world!...");
})

app.use("/api",apiRoutes);  

const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})
