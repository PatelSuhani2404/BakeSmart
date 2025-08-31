import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import productRoutes from "./routes/productRoutes.js"

dotenv.config()
const app = express()

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));

mongoose.connect("mongodb://127.0.0.1:27017/bakesmart",{
    useNewUrlParser : true,
    useUnifiedTopology : true,
})
.then(() => console.log("MongoDB connected"))
.catch((err)=>{
    console.error("MongoDB connection error : ",err.message);
    process.exit(1);
})

app.use("/api/products",productRoutes);

app.get("/",(req,res) => {
    res.send("BakeSmart product API running")
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`server running on http://localhost:${PORT}`));