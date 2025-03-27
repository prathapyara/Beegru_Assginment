import express from "express";
import userRoutes from "./userRoutes.js";
import propertyRoutes from "./propertyRoutes.js";

const app=express();
app.use("/users",userRoutes);
app.use("/properties", propertyRoutes);

export default app;