import express from "express";
import { createNewDeal } from "../controllers/adminController.js"

const router = express.Router();


router.post('/deals', createNewDeal)

export default router;