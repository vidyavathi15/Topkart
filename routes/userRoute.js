import express from "express";
import { getAllDeals } from "../controllers/userController.js";

const router = express.Router();

router.get("/deals",getAllDeals)


export default router;