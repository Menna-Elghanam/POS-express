import mongoose from 'mongoose';

const TableSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true, unique: true },
  status: { 
    type: String, 
    enum: ['available', 'occupied', 'reserved'], 
    default: 'available' 
  },
  currentOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }, // Link to an order
  capacity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Table = mongoose.model('Table', TableSchema);

export default Table;
