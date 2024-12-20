import 'dotenv/config';
import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import foodRouter from "./routers/food.router.js"
import authRoutes from './routers/auth.js';
import orderRouter from './routers/orders.js';
import analyticsRouter from './routers/analytics.js';
import tableRoutes from './routers/tableRoutes.js';



const app = express();
// cors midleware
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.use(express.json());
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error('MongoDB connection error:', error));
// serve routers 
app.use('/api/foods',foodRouter)
//  auth routes
app.use('/api/auth', authRoutes);
// orders routes
app.use('/api/orders', orderRouter);
// analytics router 
app.use('/api/analytics', analyticsRouter);

app.use('/api/tables', tableRoutes);





// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

