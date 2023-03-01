import express from "express";
import { getAllDeals, placeOrder } from "../controllers/userController.js";

const router = express.Router();

router.get("/deals",getAllDeals)
router.post("/order/:id",placeOrder)


export default router;