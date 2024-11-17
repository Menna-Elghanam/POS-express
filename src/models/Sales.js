import mongoose from "mongoose";

const SalesSchema = new mongoose.Schema({
  daily: { type: Number, required: true },
  weekly: { type: Number, required: true },
  monthly: { type: Number, required: true },
});

export default mongoose.model("Sales", SalesSchema);
