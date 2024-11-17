import mongoose from "mongoose";

const TrafficSchema = new mongoose.Schema({
  day: { type: String, required: true },
  count: { type: Number, required: true },
});

export default mongoose.model("Traffic", TrafficSchema);
