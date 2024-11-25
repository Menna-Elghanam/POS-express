import express from 'express';
import Order from '../models/Order.js';
const router = express.Router();

// Get analytics summary
router.get('/', async (req, res) => {
    try {
      const totalOrders = await Order.countDocuments();
      const statusDistribution = await Order.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]);
      const orderTypeDistribution = await Order.aggregate([
        { $group: { _id: '$orderType', count: { $sum: 1 } } }
      ]);
      const revenueTrend = await Order.aggregate([
        { 
          $group: { 
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, 
            totalRevenue: { $sum: "$total" } 
          } 
        },
        { $sort: { _id: 1 } }
      ]);
  
      res.status(200).json({
        totalOrders,
        statusDistribution,
        orderTypeDistribution,
        revenueTrend
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching analytics', error });
    }
  });
  export default router;
