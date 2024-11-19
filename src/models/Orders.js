// Order Schema

import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  tableNumber: Number,
  items: [
      {
          name: String,
          quantity: Number,
          price: Number,
      },
  ],
  totalPrice: Number,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);


