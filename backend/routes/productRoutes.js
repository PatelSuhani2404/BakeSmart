import express from "express";
import Product from "../models/productModel.js";

const router = express.Router();

router.get("/",async (req,res) => {
        try{
            const { category } = req.query;
            const query = category ? { category } : {};
            const products = await Product.find(query)
            res.json(products);
        }catch(err){
            res.status(500).json({ message : "Error fetching products."  })
        }
    });
router.post("/",async(req,res) =>{
        try{
            const { name,price,flavor,image,weight,category } = req.body;
            const newProduct = new Product({
                name,
                price,
                flavor,
                image,
                weight,
                category,
            })
            const savedProduct = await newProduct.save();
            res.status(201).json(savedProduct);
        }catch(err){
            res.status(400).json({ message : "Error at adding product."  })
        }
    });
router.put("/:id",async(req,res) => {
        try{
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id,req.body,{ new: true });
            if (!updatedProduct)
                return res.status(404).json({ message : "Product not found." })
            res.json(updatedProduct)
        }catch(err){
            res.status(400).json({ message : "Error at updating product."  })
        }
    });
router.delete("/:id",async (req,res) => {
        try{
            const deleteProduct = await Product.findByIdAndDelete(req.params.id);
            if(!deleteProduct)
                return res.status(404).json({ message : "Product not found." })
            res.json({ message : "Product deleted successfully." })
        }catch(err){
            res.status(500).json({ message : "Error at deleting product."  })
        }
    });
router.get("/search", async (req, res) => {
  try {
    const { query, type } = req.query;
    if (!query) return res.json([]);

    const safe = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const field = type === "flavor" ? "flavor" : "name";
    const filter = { [field]: { $regex: safe, $options: "i" } };

    const products = await Product.find(filter)
      .limit(20)
      .select("name price image flavor weight category");

    res.json(products);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Error while searching products." });
  }
});

export default router;