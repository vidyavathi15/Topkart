import express from "express";
import { getAllDeals, orderStatus, placeOrder } from "../controllers/userController.js";

const router = express.Router();

router.get("/deals",getAllDeals)
router.post("/order/:id",placeOrder)
router.get('/order/:id',orderStatus)


export default router;