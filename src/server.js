import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router.js"
const app = express();
// cors midleware
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);
// serve routers 
app.use('/api/foods',foodRouter)

const PORT=5000
app.listen(PORT,()=>(
    console.log("app listining on port"+ PORT)
))

