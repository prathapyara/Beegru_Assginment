import { Router } from "express";
import { verifyIsLoggedIn } from "../middleware/verifyIsLoggedIn.js";
import { createProperty,getProperty ,updateProperty,deletProperty} from "../controllers/propertyController.js";

const router=Router();

router.use(verifyIsLoggedIn);
router.post("/",createProperty);
router.get("/",getProperty);
router.put("/:id",updateProperty);
router.delete("/:id",deletProperty);


export default router;