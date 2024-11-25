import express from 'express';
import Table from '../models/Table.js';
import Order from '../models/Order.js';

const router = express.Router();

// Create a new table
router.post('/', async (req, res) => {
  try {
    const { tableNumber, capacity } = req.body;
    const newTable = new Table({ tableNumber, capacity });
    const savedTable = await newTable.save();
    res.status(201).json(savedTable);
  } catch (error) {
    res.status(500).json({ message: 'Error creating table', error });
  }
});

// Get all tables
router.get('/', async (req, res) => {
  try {
    const tables = await Table.find().populate('currentOrder'); // Include order details
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tables', error });
  }
});

// Update table status
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedTable = await Table.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedTable) {
      return res.status(404).json({ message: 'Table not found' });
    }
    res.status(200).json(updatedTable);
  } catch (error) {
    res.status(500).json({ message: 'Error updating table status', error });
  }
});

// Assign an order to a table
router.put('/:id/assign-order', async (req, res) => {
  try {
    const { id } = req.params;
    const { orderId } = req.body;

    const table = await Table.findById(id);
    if (!table) return res.status(404).json({ message: 'Table not found' });

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (table.status !== 'available') {
      return res.status(400).json({ message: 'Table is not available' });
    }

    table.status = 'occupied';
    table.currentOrder = orderId;
    const updatedTable = await table.save();

    res.status(200).json(updatedTable);
  } catch (error) {
    res.status(500).json({ message: 'Error assigning order to table', error });
  }
});

// Delete a table
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTable = await Table.findByIdAndDelete(id);
    if (!deletedTable) {
      return res.status(404).json({ message: 'Table not found' });
    }
    res.status(200).json({ message: 'Table deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting table', error });
  }
});

export default router;
