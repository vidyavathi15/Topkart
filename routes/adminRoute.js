import express from "express";
import { createNewDeal, updateDeal } from "../controllers/adminController.js"

const router = express.Router();


router.post('/deals', createNewDeal)
router.put('/deals/:id/update',updateDeal)
router.put('/deals/:id')

export default router;