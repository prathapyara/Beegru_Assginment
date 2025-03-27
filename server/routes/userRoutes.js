import { Router } from "express";
import { createUser,getUser,loginUser } from "../controllers/userController.js";

const router=Router();

router.post("/register",createUser);
router.post("/login",loginUser);
router.get("/",getUser);

export default router;