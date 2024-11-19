import { Router } from "express";
import Order from "../models/Orders.js";


const router = Router();

router.post('/', async (req, res) => {
    const { tableNumber, items } = req.body;

    const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const newOrder = new Order({
        tableNumber,
        items,
        totalPrice,
    });

    try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json({ message: 'Failed to save order', error: err });
    }
});

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch orders', error: err });
    }
});

export default router;
