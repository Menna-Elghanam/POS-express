import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  itemId: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const OrderSchema = new mongoose.Schema({
  orderType: { type: String, enum: ['place', 'delivery'], required: true },
  userName: { type: String },  // Add this field to store the username
  userContact: { type: String },  // Add this field to store the contact info
  deliveryAddress: { type: String },
  selectedTable: { type: String },
  cartItems: [{
    itemId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'in-progress', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});


const Order = mongoose.model('Order', OrderSchema);

export default Order;
