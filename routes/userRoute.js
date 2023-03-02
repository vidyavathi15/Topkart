import express from "express";
import { getAllDeals, orderStatus, placeOrder } from "../controllers/userController.js";
import authMiddleWare from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/deals",authMiddleWare,getAllDeals)
router.post("/order/:id",authMiddleWare,placeOrder)
router.get('/order/:id',authMiddleWare,orderStatus)


export default router;