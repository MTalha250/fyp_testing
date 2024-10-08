import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getOrders, intent, confirm, updateOrderStatus } from "../controllers/order.controller.js";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/", verifyToken, confirm);
router.put("/status/:id",verifyToken, updateOrderStatus);

export default router;
