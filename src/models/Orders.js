import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema({
  category: { type: String, required: true },
  count: { type: Number, required: true },
  status: { type: String, enum: ["Completed", "Pending", "Canceled"], required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Orders", OrdersSchema);
